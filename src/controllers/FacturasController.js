import facturasService from '../services/FacturasService.js'
import {
  FacturaCreateSchema,
  PagoCreateSchema,
} from '../models/FacturasModel.js'
import { ZodError } from 'zod'
import { success, error } from '../utils/responseHandler.js'

class FacturasController {
  async create(req, res) {
    try {
      const parsed = FacturaCreateSchema.parse(req.body)
      const created = await facturasService.createFactura(parsed)
      return success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError)
        return error(req, res, { errors: err.errors }, 400)
      if (err.message && err.message.includes('no encontrada'))
        return error(req, res, err.message, 404)
      return error(req, res, err.message, 400)
    }
  }

  async get(req, res) {
    try {
      const f = await facturasService.getFactura(req.params.id)
      if (!f) return error(req, res, 'Factura no encontrada', 404)
      return success(req, res, f, 200)
    } catch (err) {
      return error(req, res, err.message, 500)
    }
  }

  async createPago(req, res) {
    try {
      const parsed = PagoCreateSchema.parse(req.body)
      const created = await facturasService.createPago(req.params.id, parsed)
      return success(req, res, created, 201)
    } catch (err) {
      if (err instanceof ZodError)
        return error(req, res, { errors: err.errors }, 400)
      if (err.message && err.message.includes('excede'))
        return error(req, res, err.message, 400)
      return error(req, res, err.message, 400)
    }
  }
}

export default new FacturasController()
