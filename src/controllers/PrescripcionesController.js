import PrescripcionesService from '../services/PrescripcionesService.js'
import {
  createPrescripciones,
  updatePrescripciones,
} from '../models/PrescripcionesModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class PrescripcionesController {
  async createPrescripcion(req, res) {
    try {
      const validated = createPrescripciones.parse(req.body)
      const nuevo = await PrescripcionesService.createPrescripcion(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async getAllPrescripciones(req, res) {
    try {
      const rows = await PrescripcionesService.getAllPrescripciones()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getPrescripcionById(req, res) {
    try {
      const row = await PrescripcionesService.getPrescripcionById(req.params.id)
      success(req, res, row, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updatePrescripcion(req, res) {
    try {
      const validated = updatePrescripciones.parse(req.body)
      const updated = await PrescripcionesService.updatePrescripcion(
        req.params.id,
        validated
      )
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async deletePrescripcion(req, res) {
    try {
      await PrescripcionesService.deletePrescripcion(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new PrescripcionesController()
