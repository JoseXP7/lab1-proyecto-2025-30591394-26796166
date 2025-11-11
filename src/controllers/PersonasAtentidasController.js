import PersonasAtendidasService from '../services/PersonasAtendidasService.js'
import {
  createPersonasAtendidas,
  updatePersonasAtendidas,
} from '../models/PersonasAtendidasModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class PersonasAtendidasController {
  async createPersonaAtendida(req, res) {
    try {
      const validatedData = createPersonasAtendidas.parse(req.body)
      const newPersona = await PersonasAtendidasService.createPersonaAtendida(
        validatedData
      )
      success(req, res, newPersona, 201)
    } catch (err) {
      if (err instanceof ZodError) {
        return error(req, res, { errors: err }, 400)
      }
      if (err.message.includes('número de documento')) {
        return error(req, res, err.message, 409)
      }
      error(req, res, err.message, 500)
    }
  }

  async getAllPersonasAtendidas(req, res) {
    try {
      const personas = await PersonasAtendidasService.getAllPersonasAtendidas()
      success(req, res, personas, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getPersonaAtendidaById(req, res) {
    try {
      const persona = await PersonasAtendidasService.getPersonaAtendidaById(
        req.params.id
      )
      success(req, res, persona, 200)
    } catch (err) {
      if (err.message.includes('no encontrada')) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async updatePersonaAtendida(req, res) {
    try {
      const validatedData = updatePersonasAtendidas.parse(req.body)
      const updatedPersona =
        await PersonasAtendidasService.updatePersonaAtendida(
          req.params.id,
          validatedData
        )
      success(req, res, updatedPersona, 200)
    } catch (err) {
      if (err instanceof ZodError) {
        return error(req, res, { errors: err }, 400)
      }
      if (err.message.includes('no encontrada')) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async deletePersonaAtendida(req, res) {
    try {
      await PersonasAtendidasService.deletePersonaAtendida(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrada')) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }
}

export default new PersonasAtendidasController()
