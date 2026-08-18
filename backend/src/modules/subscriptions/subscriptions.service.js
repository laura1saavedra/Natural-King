import { randomUUID } from 'node:crypto'
import { prisma } from '../../config/prisma.js'

function requestError(message, status = 400) {
  return Object.assign(new Error(message), { status })
}

export async function subscribe(emailInput) {
  if (typeof emailInput !== 'string') {
    throw requestError('Ingresa un correo electrónico válido.')
  }

  const email = emailInput.trim().toLowerCase()

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw requestError('Ingresa un correo electrónico válido.')
  }

  const id = randomUUID()

  await prisma.$executeRaw`
    INSERT INTO "NewsletterSubscriber" ("id", "email", "active", "createdAt", "updatedAt")
    VALUES (${id}, ${email}, true, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    ON CONFLICT ("email") DO UPDATE
    SET "active" = true, "updatedAt" = CURRENT_TIMESTAMP
  `
}
