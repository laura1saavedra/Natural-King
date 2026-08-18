import { Router } from 'express'
import { postSubscription } from './subscriptions.controller.js'

export const subscriptionsRouter = Router()

subscriptionsRouter.post('/', postSubscription)
