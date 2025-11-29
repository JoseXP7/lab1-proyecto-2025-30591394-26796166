import ConsentimientosService from '../services/ConsentimientosService.js'
import { createConsentimiento } from '../models/ConsentimientosModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class ConsentimientosController {
  async createConsentimiento(req, res) {
    try {
      const validated = createConsentimiento.parse(req.body)
      const created = await ConsentimientosService.createConsentimiento(
        validated
      )
      success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new ConsentimientosController()
