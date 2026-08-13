import { Router } from 'express'
import { postOrder } from './orders.controller.js'

export const ordersRouter = Router()

ordersRouter.post('/', postOrder)
