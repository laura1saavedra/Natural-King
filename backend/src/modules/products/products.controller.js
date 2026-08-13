import { findProductById, findProductBySlug, listProducts } from './products.service.js'

export async function getProducts(req, res, next) {
  try {
    res.json(await listProducts())
  } catch (error) {
    next(error)
  }
}

export async function getProduct(req, res, next) {
  try {
    const product = await findProductById(req.params.id)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' })
    res.json(product)
  } catch (error) {
    next(error)
  }
}

export async function getProductBySlug(req, res, next) {
  try {
    const product = await findProductBySlug(req.params.slug)
    if (!product) return res.status(404).json({ message: 'Producto no encontrado.' })
    res.json(product)
  } catch (error) {
    next(error)
  }
}
