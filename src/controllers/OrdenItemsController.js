import OrdenItemsService from '../services/OrdenItemsService.js'
import { createOrdenItem } from '../models/OrdenItemsModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class OrdenItemsController {
  async createItem(req, res) {
    try {
      const validated = createOrdenItem.parse(req.body)
      const nuevo = await OrdenItemsService.create(req.params.id, validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async listItems(req, res) {
    try {
      const rows = await OrdenItemsService.listByOrden(req.params.id)
      success(req, res, rows, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new OrdenItemsController()
