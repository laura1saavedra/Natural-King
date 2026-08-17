import nodemailer from 'nodemailer'
import { env } from '../config/env.js'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const shippingLabels = {
  standard: 'Envío estándar',
  express: 'Envío exprés',
  pickup: 'Recoger en tienda',
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function formatMoney(value) {
  return currencyFormatter.format(Number(value))
}

function orderItemsHtml(items) {
  return items.map((item) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #e5e7eb">${escapeHtml(item.productName)}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center">${item.quantity}</td>
      <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right">${formatMoney(Number(item.unitPrice) * item.quantity)}</td>
    </tr>
  `).join('')
}

function emailLayout(content) {
  return `
    <!doctype html>
    <html lang="es">
      <body style="margin:0;background:#f3f5f1;font-family:Arial,sans-serif;color:#243322">
        <div style="max-width:640px;margin:0 auto;padding:28px 16px">
          <div style="background:#315f25;color:#fff;padding:22px 28px;border-radius:12px 12px 0 0">
            <strong style="font-size:22px">NATURAL KING</strong>
          </div>
          <div style="background:#fff;padding:28px;border-radius:0 0 12px 12px">${content}</div>
        </div>
      </body>
    </html>
  `
}

function customerEmail(order) {
  return emailLayout(`
    <h1 style="margin-top:0;font-size:24px">¡Recibimos tu pedido!</h1>
    <p>Hola ${escapeHtml(order.recipientName)}, tu pedido <strong>${escapeHtml(order.number)}</strong> fue registrado correctamente.</p>
    <table style="width:100%;border-collapse:collapse;margin:22px 0">
      <thead><tr><th style="text-align:left">Producto</th><th>Cantidad</th><th style="text-align:right">Subtotal</th></tr></thead>
      <tbody>${orderItemsHtml(order.items)}</tbody>
    </table>
    <p style="font-size:18px;text-align:right"><strong>Total: ${formatMoney(order.total)}</strong></p>
    <p>Método de entrega: ${escapeHtml(shippingLabels[order.shippingMethod] ?? order.shippingMethod)}.</p>
    <p>Conserva el número del pedido para cualquier consulta.</p>
  `)
}

function adminEmail(order) {
  return emailLayout(`
    <h1 style="margin-top:0;font-size:24px">Nuevo pedido ${escapeHtml(order.number)}</h1>
    <p><strong>Cliente:</strong> ${escapeHtml(order.recipientName)}</p>
    <p><strong>Correo:</strong> ${escapeHtml(order.recipientEmail)}</p>
    <p><strong>Teléfono:</strong> ${escapeHtml(order.recipientPhone)}</p>
    <p><strong>Dirección:</strong> ${escapeHtml(order.shippingLine1)}, ${escapeHtml(order.shippingCity)}, ${escapeHtml(order.shippingDepartment)}</p>
    <table style="width:100%;border-collapse:collapse;margin:22px 0">
      <thead><tr><th style="text-align:left">Producto</th><th>Cantidad</th><th style="text-align:right">Subtotal</th></tr></thead>
      <tbody>${orderItemsHtml(order.items)}</tbody>
    </table>
    <p style="font-size:18px;text-align:right"><strong>Total: ${formatMoney(order.total)}</strong></p>
  `)
}

function getTransporter() {
  if (!env.emailUser || !env.emailAppPassword) return null

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.emailUser,
      pass: env.emailAppPassword,
    },
  })
}

export async function sendOrderEmails(order) {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('Correo desactivado: configura EMAIL_USER y EMAIL_APP_PASSWORD.')
    return
  }

  const from = `Natural King <${env.emailUser}>`
  const messages = [
    transporter.sendMail({
      from,
      to: order.recipientEmail,
      subject: `Confirmación de pedido ${order.number}`,
      html: customerEmail(order),
    }),
  ]

  if (env.adminEmail) {
    messages.push(transporter.sendMail({
      from,
      to: env.adminEmail,
      replyTo: order.recipientEmail,
      subject: `Nuevo pedido ${order.number} - ${order.recipientName}`,
      html: adminEmail(order),
    }))
  }

  const results = await Promise.allSettled(messages)
  results.forEach((result) => {
    if (result.status === 'rejected') {
      console.error('No fue posible enviar un correo del pedido:', result.reason?.message ?? result.reason)
    }
  })
}
