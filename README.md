# Natural King

Tienda en línea organizada como un monorepo con React, Vite y Tailwind CSS en el frontend, y Node.js, Express, Prisma y PostgreSQL en el backend.

## Estructura

- `frontend/`: interfaz React y recursos visuales.
- `backend/`: API REST, módulos de negocio y esquema Prisma.
- `legacy/`: respaldo del HTML y CSS originales.
- `compose.yaml`: PostgreSQL local para desarrollo.

## Desarrollo local

1. Instala las dependencias con `npm install`.
2. Copia `backend/.env.example` como `backend/.env`.
3. Inicia PostgreSQL con `docker compose up -d database`.
4. Genera Prisma con `npm run prisma:generate --workspace backend`.
5. Crea la primera migración con `npm run prisma:migrate --workspace backend -- --name init`.
6. Inicia frontend y backend con `npm run dev`.

El frontend estará en `http://localhost:5173` y la API en `http://localhost:3000`.
