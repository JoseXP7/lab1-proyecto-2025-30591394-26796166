import AseguradorasService from "../services/AseguradorasService.js"
import {
  createAseguradora,
  updateAseguradora,
} from "../models/AseguradorasModel.js"
import { ZodError } from "zod"
import { success, error } from "../utils/responseHandler.js"

class AseguradorasController {
  async createAseguradora(req, res) {
    try {
      const validatedData = createAseguradora.parse(req.body)
      const nuevaAseguradora = await AseguradorasService.create(validatedData)

      success(req, res, nuevaAseguradora, 201)
    } catch (err) {
      if (err instanceof ZodError) {
        return error(req, res, { errors: err }, 400)
      }
      // Conflicto por datos únicos (ej: nombre o código)
      if (err.message.includes("ya existe")) {
        return error(req, res, err.message, 409)
      }
      error(req, res, err.message, 500)
    }
  }

  async getAllAseguradoras(req, res) {
    try {
      const aseguradoras = await AseguradorasService.list()
      success(req, res, aseguradoras, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getAseguradoraById(req, res) {
    try {
      const aseguradora = await AseguradorasService.getById(req.params.id)
      success(req, res, aseguradora, 200)
    } catch (err) {
      if (err.message.includes("no encontrada")) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async patchAseguradora(req, res) {
    try {
      const validatedData = updateAseguradora.parse(req.body)
      const updatedAseguradora = await AseguradorasService.update(
        req.params.id,
        validatedData,
      )

      success(req, res, updatedAseguradora, 200)
    } catch (err) {
      if (err instanceof ZodError) {
        return error(req, res, { errors: err }, 400)
      }
      if (err.message.includes("no encontrada")) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async deleteAseguradora(req, res) {
    try {
      await AseguradorasService.deactivate(req.params.id)
      success(req, res, "", 204)
    } catch (err) {
      if (err.message.includes("no encontrada")) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }
}

export default new AseguradorasController()
