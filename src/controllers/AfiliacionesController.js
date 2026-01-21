import AfiliacionesService from '../services/AfiliacionesService.js'
import {
  createAfiliacion,
  updateAfiliacion,
} from '../models/AfiliacionesModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class AfiliacionesController {
  async createAfiliacion(req, res) {
    try {
      const validated = createAfiliacion.parse(req.body)
      const nueva = await AfiliacionesService.create(validated)
      success(req, res, nueva, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (
        typeof err.message === 'string' &&
        (err.message.includes('no encontrada') ||
          err.message.includes('no encontrado'))
      ) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async listAfiliaciones(req, res) {
    try {
      const list = await AfiliacionesService.list()
      success(req, res, list, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getAfiliacionById(req, res) {
    try {
      const afiliacion = await AfiliacionesService.getById(req.params.id)
      success(req, res, afiliacion, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updateAfiliacion(req, res) {
    try {
      const validated = updateAfiliacion.parse(req.body)
      const updated = await AfiliacionesService.update(req.params.id, validated)
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new AfiliacionesController()
