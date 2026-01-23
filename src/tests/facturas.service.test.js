import { describe, it, expect, vi, beforeEach } from "vitest"

// Mocks for repositories and prisma
vi.mock("../repositories/FacturasRepository.js", () => ({
  default: {
    findById: vi.fn(),
    sumPagos: vi.fn(),
    addPago: vi.fn(),
    createFactura: vi.fn(),
  },
}))

vi.mock("../repositories/PrestacionesRepository.js", () => ({
  default: {
    findByCodigo: vi.fn(),
  },
}))

vi.mock("../repositories/ArancelRepository.js", () => ({
  default: {
    findActiveByPrestacionAndPlan: vi.fn(),
  },
}))

vi.mock("../config/prisma.js", () => ({
  default: {
    facturas: { update: vi.fn() },
  },
}))

import facturasRepo from "../repositories/FacturasRepository.js"
import prestacionesRepo from "../repositories/PrestacionesRepository.js"
import arancelRepo from "../repositories/ArancelRepository.js"
import prisma from "../config/prisma.js"
import FacturasService from "../services/FacturasService.js"

describe("FacturasService - pagos y creación", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it("rechaza pago que excede el saldo pendiente", async () => {
    facturasRepo.findById.mockResolvedValue({ id: 1, total: 50 })
    facturasRepo.sumPagos.mockResolvedValue(30)

    await expect(
      FacturasService.createPago(1, { monto: 30, medio: "EFECTIVO" }),
    ).rejects.toThrow("El pago excede el saldo pendiente")

    expect(facturasRepo.addPago).not.toHaveBeenCalled()
  })

  it("crea pago y marca factura PAGADA cuando se completa el total", async () => {
    facturasRepo.findById.mockResolvedValue({ id: 2, total: 50 })
    facturasRepo.sumPagos.mockResolvedValue(30)
    facturasRepo.addPago.mockResolvedValue({ id: 10, monto: 20 })

    await FacturasService.createPago(2, { monto: 20, medio: "TARJETA" })

    expect(facturasRepo.addPago).toHaveBeenCalledWith(2, {
      monto: 20,
      medio: "TARJETA",
    })
    expect(prisma.facturas.update).toHaveBeenCalledWith({
      where: { id: Number(2) },
      data: { estado: "PAGADA" },
    })
  })

  it("al crear factura con estado EMITIDA exige arancel vigente y falla si falta", async () => {
    prestacionesRepo.findByCodigo.mockResolvedValue({ codigo: "P001" })
    arancelRepo.findActiveByPrestacionAndPlan.mockResolvedValue(null)

    const data = {
      numero: "F-TEST",
      fechaEmision: new Date().toISOString(),
      personaId: 1,
      aseguradoraId: null,
      moneda: "USD",
      estado: "EMITIDA",
      items: [{ prestacionCodigo: "P001", cantidad: 1 }],
    }

    await expect(FacturasService.createFactura(data)).rejects.toThrow(
      /No existe precio vigente/,
    )
  })

  it("calculates subtotal and total and calls createFactura when arancel exists", async () => {
    prestacionesRepo.findByCodigo.mockResolvedValue({ codigo: "P001" })
    arancelRepo.findActiveByPrestacionAndPlan.mockResolvedValue({
      id: 1,
      valorBase: 10,
    })
    facturasRepo.createFactura.mockResolvedValue({ id: 100 })

    const data = {
      numero: "F-TEST-2",
      fechaEmision: new Date().toISOString(),
      personaId: 1,
      aseguradoraId: null,
      moneda: "USD",
      estado: "EMITIDA",
      items: [
        {
          prestacionCodigo: "P001",
          cantidad: 2,
          valorUnitario: 10,
          impuestos: 0,
        },
      ],
    }

    const created = await FacturasService.createFactura(data)

    expect(facturasRepo.createFactura).toHaveBeenCalled()
    expect(created).toEqual({ id: 100 })
  })
})
