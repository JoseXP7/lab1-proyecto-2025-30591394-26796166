import { error } from './responseHandler.js'

function errors(err, req, res, next) {
  console.log('[error]', err)

  const message = err.message || 'Error interno'
  const status = err.statusCode || 500

  error(req, res, message, status)
}

export default errors
