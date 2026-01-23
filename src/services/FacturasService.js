import facturasRepo from "../repositories/FacturasRepository.js"
import prestacionesRepo from "../repositories/PrestacionesRepository.js"
import arancelRepo from "../repositories/ArancelRepository.js"
import prisma from "../config/prisma.js"

class FacturasService {
  async createFactura(data) {
    // Business rule: when estado is 'EMITIDA', all items must have prestacion completada and precio vigente
    const fecha = data.fechaEmision ? new Date(data.fechaEmision) : new Date()

    for (const item of data.items) {
      const prest = await prestacionesRepo.findByCodigo(item.prestacionCodigo)
      if (!prest)
        throw new Error(`Prestacion ${item.prestacionCodigo} no encontrada`)

      // check there is an arancel vigente for that prestacion (optionally filtered by planId)
      const arancel = await arancelRepo.findActiveByPrestacionAndPlan(
        item.prestacionCodigo,
        data.aseguradoraId || data.planId,
        fecha,
      )
      if (!arancel)
        throw new Error(
          `No existe precio vigente para prestacion ${item.prestacionCodigo} en la fecha ${fecha.toISOString().split("T")[0]}`,
        )
    }

    // compute subtotal and total if not provided
    let subtotal = 0
    for (const it of data.items) {
      const lineTotal =
        it.total ??
        (it.valorUnitario || 0) * (it.cantidad || 1) + (it.impuestos || 0)
      subtotal += lineTotal
    }
    const total = data.total ?? subtotal

    const toCreate = { ...data, subtotal, total }
    return facturasRepo.createFactura(toCreate)
  }

  async getFactura(id) {
    return facturasRepo.findById(id)
  }

  async createPago(facturaId, pagoData) {
    const factura = await facturasRepo.findById(facturaId)
    if (!factura) throw new Error("Factura no encontrada")
    // compute pendiente
    const paid = await facturasRepo.sumPagos(facturaId)
    const pendiente = Number(factura.total) - Number(paid || 0)
    if (pagoData.monto > pendiente)
      throw new Error("El pago excede el saldo pendiente")

    const created = await facturasRepo.addPago(facturaId, pagoData)
    // if pago completa total, update factura estado to PAGADA (simple approach)
    const newPaid = paid + Number(pagoData.monto)
    if (newPaid >= Number(factura.total)) {
      // update factura estado
      await prisma.facturas.update({
        where: { id: Number(facturaId) },
        data: { estado: "PAGADA" },
      })
    }
    return created
  }
}

export default new FacturasService()
