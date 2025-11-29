import OrdenesService from '../services/OrdenesService.js'
import { createOrdenes, updateOrdenes } from '../models/OrdenesModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class OrdenesController {
  async createOrden(req, res) {
    try {
      const validated = createOrdenes.parse(req.body)
      const nuevo = await OrdenesService.createOrden(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async getAllOrdenes(req, res) {
    try {
      const rows = await OrdenesService.getAllOrdenes()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getOrdenById(req, res) {
    try {
      const row = await OrdenesService.getOrdenById(req.params.id)
      success(req, res, row, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updateOrden(req, res) {
    try {
      const validated = updateOrdenes.parse(req.body)
      const updated = await OrdenesService.updateOrden(req.params.id, validated)
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async deleteOrden(req, res) {
    try {
      await OrdenesService.deleteOrden(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new OrdenesController()
