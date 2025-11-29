import EpisodiosService from '../services/EpisodiosService.js'
import { createEpisodios, updateEpisodios } from '../models/EpisodiosModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class EpisodiosController {
  async createEpisodio(req, res) {
    try {
      const validated = createEpisodios.parse(req.body)
      const nuevo = await EpisodiosService.createEpisodio(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async getAllEpisodios(req, res) {
    try {
      const rows = await EpisodiosService.getAllEpisodios()
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getEpisodioById(req, res) {
    try {
      const row = await EpisodiosService.getEpisodioById(req.params.id)
      success(req, res, row, 200)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async getEpisodiosByPersona(req, res) {
    try {
      const { id } = req.params
      const rows = await EpisodiosService.getEpisodiosByPersona(id)
      success(req, res, rows, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async updateEpisodio(req, res) {
    try {
      const validated = updateEpisodios.parse(req.body)
      const updated = await EpisodiosService.updateEpisodio(
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

  async deleteEpisodio(req, res) {
    try {
      await EpisodiosService.deleteEpisodio(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrado'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new EpisodiosController()
