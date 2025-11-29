import ResultadosService from '../services/ResultadosService.js'
import {
  createResultados,
  updateResultados,
} from '../models/ResultadosModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class ResultadosController {
  async createResultado(req, res) {
    try {
      const validated = createResultados.parse(req.body)
      const nuevo = await ResultadosService.createResultado(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async getAllResultados(req, res) {
    try {
      const rows = await ResultadosService.getAllResultados()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getResultadoById(req, res) {
    try {
      const row = await ResultadosService.getResultadoById(req.params.id)
      success(req, res, row, 200)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updateResultado(req, res) {
    try {
      const validated = updateResultados.parse(req.body)
      const updated = await ResultadosService.updateResultado(
        req.params.id,
        validated
      )
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async deleteResultado(req, res) {
    try {
      await ResultadosService.deleteResultado(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new ResultadosController()
