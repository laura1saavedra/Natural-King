import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const categories = [
  {
    name: 'Cuidado personal',
    slug: 'cuidado-personal',
  },
  {
    name: 'Limpieza del hogar',
    slug: 'limpieza-hogar',
  },
]

const products = [
  {
    name: 'Kit de limpieza personal',
    slug: 'kit-limpieza-personal',
    sku: 'NK-KIT-PERSONAL',
    description: 'Kit completo con productos esenciales para el cuidado y la higiene personal diaria.',
    price: '74500.00',
    stock: 20,
    imageUrl: '/img/kitPersonal.png',
    categorySlug: 'cuidado-personal',
  },
  {
    name: 'Kit de limpieza para el hogar',
    slug: 'kit-limpieza-hogar',
    sku: 'NK-KIT-HOGAR',
    description: 'Kit práctico con productos esenciales para mantener el hogar limpio y organizado.',
    price: '55000.00',
    stock: 20,
    imageUrl: '/img/kit-hogar.png',
    categorySlug: 'limpieza-hogar',
  },
  {
    name: 'Kit de viaje esencial',
    slug: 'kit-viaje-esencial',
    sku: 'NK-KIT-VIAJE',
    description: 'Kit compacto con artículos esenciales de aseo para llevar durante tus viajes.',
    price: '25000.00',
    stock: 20,
    imageUrl: '/img/kit-aseo.png',
    categorySlug: 'cuidado-personal',
  },
]

async function seed() {
  const categoryIds = new Map()

  for (const category of categories) {
    const savedCategory = await prisma.category.upsert({
      where: { slug: category.slug },
      update: {
        name: category.name,
        active: true,
      },
      create: category,
    })

    categoryIds.set(category.slug, savedCategory.id)
  }

  for (const { categorySlug, ...product } of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        ...product,
        active: true,
        categoryId: categoryIds.get(categorySlug),
      },
      create: {
        ...product,
        categoryId: categoryIds.get(categorySlug),
      },
    })
  }

  const [categoryCount, productCount] = await Promise.all([
    prisma.category.count(),
    prisma.product.count(),
  ])

  console.log(`Seed completado: ${categoryCount} categorías y ${productCount} productos en la base de datos.`)
}

seed()
  .catch((error) => {
    console.error('No fue posible cargar los datos iniciales.', error)
    process.exitCode = 1
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
