const API_URL = import.meta.env.VITE_API_URL ?? '/api'

export async function api(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'No fue posible completar la solicitud.' }))
    throw new Error(error.message)
  }

  return response.status === 204 ? null : response.json()
}
