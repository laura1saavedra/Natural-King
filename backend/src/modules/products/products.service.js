import { prisma } from '../../config/prisma.js'

export function listProducts() {
  return prisma.product.findMany({
    where: { active: true },
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  })
}

export function findProductById(id) {
  return prisma.product.findFirst({
    where: { id, active: true },
    include: { category: true },
  })
}
