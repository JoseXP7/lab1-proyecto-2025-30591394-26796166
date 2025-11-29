import NotasClinicasService from '../services/NotasClinicasService.js'
import { createNota } from '../models/NotasClinicasModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class NotasClinicasController {
  async createNota(req, res) {
    try {
      const { id } = req.params
      const validated = createNota.parse(req.body)
      const created = await NotasClinicasService.createNota(id, validated)
      success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new NotasClinicasController()
