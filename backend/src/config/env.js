import 'dotenv/config'

export const env = {
  port: Number(process.env.PORT ?? 3000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:5173',
  emailUser: process.env.EMAIL_USER?.trim() ?? '',
  emailAppPassword: process.env.EMAIL_APP_PASSWORD?.replaceAll(' ', '') ?? '',
  adminEmail: process.env.ADMIN_EMAIL?.trim() ?? '',
}
