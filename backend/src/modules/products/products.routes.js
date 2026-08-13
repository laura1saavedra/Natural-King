import { Router } from 'express'
import { getProduct, getProductBySlug, getProducts } from './products.controller.js'

export const productsRouter = Router()

productsRouter.get('/', getProducts)
productsRouter.get('/slug/:slug', getProductBySlug)
productsRouter.get('/:id', getProduct)
