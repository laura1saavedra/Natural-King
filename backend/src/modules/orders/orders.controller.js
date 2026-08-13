import { createOrder } from './orders.service.js'

export async function postOrder(req, res, next) {
  try {
    const order = await createOrder(req.body)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}
