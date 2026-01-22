import ArancelService from '../services/ArancelService.js'
import { createArancel, updateArancel } from '../models/ArancelModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class ArancelController {
  async createArancel(req, res) {
    try {
      const validated = createArancel.parse(req.body)
      const nuevo = await ArancelService.create(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (
        err.message.includes('no encontrada') ||
        err.message.includes('no encontrado')
      )
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async listAranceles(req, res) {
    try {
      const rows = await ArancelService.list()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getArancel(req, res) {
    try {
      const r = await ArancelService.getById(req.params.id)
      success(req, res, r, 200)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updateArancel(req, res) {
    try {
      const validated = updateArancel.parse(req.body)
      const updated = await ArancelService.update(req.params.id, validated)
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async deleteArancel(req, res) {
    try {
      await ArancelService.delete(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new ArancelController()
