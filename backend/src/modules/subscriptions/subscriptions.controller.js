import { subscribe } from './subscriptions.service.js'

export async function postSubscription(req, res, next) {
  try {
    await subscribe(req.body?.email)
    res.status(201).json({
      message: '¡Gracias por suscribirte! Tu correo quedó registrado.',
    })
  } catch (error) {
    next(error)
  }
}
