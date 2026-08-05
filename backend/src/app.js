import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { errorHandler, notFound } from './middleware/errorHandler.js'
import { healthRouter } from './modules/health/health.routes.js'
import { productsRouter } from './modules/products/products.routes.js'

export const app = express()

app.disable('x-powered-by')
app.use(helmet())
app.use(cors({ origin: env.frontendUrl, credentials: true }))
app.use(express.json({ limit: '1mb' }))
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'))

app.use('/api/health', healthRouter)
app.use('/api/products', productsRouter)

app.use(notFound)
app.use(errorHandler)
