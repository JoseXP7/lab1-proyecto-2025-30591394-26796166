import AgendaService from '../services/AgendaService.js'
import { createAgenda, patchAgendaEstado } from '../models/AgendaModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class AgendaController {
  async getAgenda(req, res) {
    try {
      const { profesionalId, unidadId, inicio, fin } = req.query
      const results = await AgendaService.getAgenda({
        profesionalId,
        unidadId,
        inicio,
        fin,
      })
      success(req, res, results, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async createAgenda(req, res) {
    try {
      const validated = createAgenda.parse(req.body)
      const created = await AgendaService.createAgenda(validated)
      success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async patchAgendaEstado(req, res) {
    try {
      const { id } = req.params
      const { estado } = patchAgendaEstado.parse(req.body)
      const updated = await AgendaService.updateAgendaEstado(id, estado)
      success(req, res, updated, 200)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new AgendaController()
