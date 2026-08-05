export function notFound(req, res) {
  res.status(404).json({ message: `No existe la ruta ${req.method} ${req.originalUrl}.` })
}

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error)

  console.error(error)
  res.status(error.status ?? 500).json({
    message: error.status ? error.message : 'Ocurrió un error interno.',
  })
}
