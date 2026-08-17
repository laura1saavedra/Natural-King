import { createOrder } from './orders.service.js'
import { sendOrderEmails } from '../../services/email.service.js'

export async function postOrder(req, res, next) {
  try {
    const order = await createOrder(req.body)
    await sendOrderEmails(order)
    res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}
