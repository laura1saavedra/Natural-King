import { randomUUID } from 'node:crypto'
import { prisma } from '../../config/prisma.js'

const shippingCosts = {
  standard: 0,
  express: 8900,
  pickup: 0,
}

const paymentMethods = new Set(['card', 'pse', 'cash', 'transfer'])

function requestError(message, status = 400) {
  return Object.assign(new Error(message), { status })
}

function validateOrderInput(input) {
  const requiredFields = [
    'recipientName',
    'recipientEmail',
    'recipientPhone',
    'documentType',
    'documentNumber',
    'shippingLine1',
    'shippingCity',
    'shippingDepartment',
    'shippingMethod',
    'paymentMethod',
  ]

  for (const field of requiredFields) {
    if (typeof input[field] !== 'string' || !input[field].trim()) {
      throw requestError(`El campo ${field} es obligatorio.`)
    }
  }

  if (!/^\S+@\S+\.\S+$/.test(input.recipientEmail)) {
    throw requestError('El correo electrónico no es válido.')
  }

  if (!(input.shippingMethod in shippingCosts)) {
    throw requestError('El método de envío no es válido.')
  }

  if (!paymentMethods.has(input.paymentMethod)) {
    throw requestError('El método de pago no es válido.')
  }

  if (!Array.isArray(input.items) || input.items.length === 0) {
    throw requestError('El pedido debe contener al menos un producto.')
  }

  const quantities = new Map()
  for (const item of input.items) {
    if (typeof item.productId !== 'string' || !Number.isInteger(item.quantity) || item.quantity < 1) {
      throw requestError('Los productos del pedido no son válidos.')
    }
    quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity)
  }

  return [...quantities].map(([productId, quantity]) => ({ productId, quantity }))
}

function createOrderNumber() {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '')
  return `NK-${date}-${randomUUID().slice(0, 8).toUpperCase()}`
}

export async function createOrder(input) {
  const requestedItems = validateOrderInput(input)
  const productIds = requestedItems.map((item) => item.productId)
  const products = await prisma.product.findMany({
    where: { id: { in: productIds }, active: true },
  })

  if (products.length !== productIds.length) {
    throw requestError('Uno o más productos ya no están disponibles.', 409)
  }

  const productMap = new Map(products.map((product) => [product.id, product]))
  const orderItems = requestedItems.map(({ productId, quantity }) => ({
    product: productMap.get(productId),
    quantity,
  }))

  const subtotal = orderItems.reduce(
    (total, { product, quantity }) => total + Number(product.price) * quantity,
    0,
  )
  const shippingCost = shippingCosts[input.shippingMethod]
  const total = subtotal + shippingCost
  const number = createOrderNumber()

  return prisma.$transaction(async (transaction) => {
    const order = await transaction.order.create({
      data: {
        number,
        subtotal,
        shippingCost,
        total,
        recipientName: input.recipientName.trim(),
        recipientEmail: input.recipientEmail.trim().toLowerCase(),
        recipientPhone: input.recipientPhone.trim(),
        documentType: input.documentType.trim(),
        documentNumber: input.documentNumber.trim(),
        shippingLine1: input.shippingLine1.trim(),
        shippingLine2: input.shippingLine2?.trim() || null,
        shippingCity: input.shippingCity.trim(),
        shippingDepartment: input.shippingDepartment.trim(),
        shippingNeighborhood: input.shippingNeighborhood?.trim() || null,
        shippingPostalCode: input.shippingPostalCode?.trim() || null,
        shippingInstructions: input.shippingInstructions?.trim() || null,
        shippingMethod: input.shippingMethod,
        items: {
          create: orderItems.map(({ product, quantity }) => ({
            productId: product.id,
            productName: product.name,
            unitPrice: product.price,
            quantity,
          })),
        },
        payments: {
          create: {
            provider: input.paymentMethod,
            amount: total,
          },
        },
        statusHistory: {
          create: {
            status: 'PENDING_PAYMENT',
            note: 'Pedido creado desde el checkout web.',
          },
        },
      },
      include: { items: true, payments: true },
    })

    return order
  })
}
