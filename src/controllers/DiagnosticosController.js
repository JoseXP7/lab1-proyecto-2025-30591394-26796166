import DiagnosticosService from '../services/DiagnosticosService.js'
import { createDiagnosticos } from '../models/DiagnosticosModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class DiagnosticosController {
  async addDiagnosticos(req, res) {
    try {
      const { id } = req.params
      const validated = createDiagnosticos.parse(req.body)
      const created = await DiagnosticosService.addDiagnosticos(id, validated)
      success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new DiagnosticosController()
