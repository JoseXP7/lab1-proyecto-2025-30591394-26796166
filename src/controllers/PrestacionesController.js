import PrestacionesService from '../services/PrestacionesService.js'
import {
  createPrestacion,
  updatePrestacion,
} from '../models/PrestacionesModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class PrestacionesController {
  async createPrestacion(req, res) {
    try {
      const validated = createPrestacion.parse(req.body)
      const nuevo = await PrestacionesService.create(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('existe'))
        return error(req, res, err.message, 409)
      error(req, res, err.message, 500)
    }
  }

  async listPrestaciones(req, res) {
    try {
      const rows = await PrestacionesService.list()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getPrestacion(req, res) {
    try {
      const p = await PrestacionesService.getByCodigo(req.params.codigo)
      success(req, res, p, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updatePrestacion(req, res) {
    try {
      const validated = updatePrestacion.parse(req.body)
      const updated = await PrestacionesService.update(
        req.params.codigo,
        validated,
      )
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async deletePrestacion(req, res) {
    try {
      await PrestacionesService.delete(req.params.codigo)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new PrestacionesController()
