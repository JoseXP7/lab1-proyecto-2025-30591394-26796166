import PlanesCoberturaService from '../services/PlanesCoberturaService.js'
import { createPlan, updatePlan } from '../models/PlanesCoberturaModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class PlanesCoberturaController {
  async createPlan(req, res) {
    try {
      const validated = createPlan.parse(req.body)
      const nuevo = await PlanesCoberturaService.create(validated)
      success(req, res, nuevo, 201)
    } catch (err) {
      if (err instanceof ZodError) return error(req, res, { errors: err }, 400)
      if (
        typeof err.message === 'string' &&
        err.message.includes('no encontrada')
      ) {
        return error(req, res, err.message, 404)
      }
      error(req, res, err.message, 500)
    }
  }

  async listPlans(req, res) {
    try {
      const planes = await PlanesCoberturaService.list(req.query)
      success(req, res, planes, 200)
    } catch (err) {
      error(req, res, err.message, 500)
    }
  }

  async getPlanById(req, res) {
    try {
      const plan = await PlanesCoberturaService.getById(req.params.id)
      success(req, res, plan, 200)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }

  async updatePlan(req, res) {
    try {
      const validated = updatePlan.parse(req.body)
      const updated = await PlanesCoberturaService.update(
        req.params.id,
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

  async deactivatePlan(req, res) {
    try {
      await PlanesCoberturaService.deactivate(req.params.id)
      success(req, res, '', 204)
    } catch (err) {
      if (err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      error(req, res, err.message, 500)
    }
  }
}

export default new PlanesCoberturaController()
