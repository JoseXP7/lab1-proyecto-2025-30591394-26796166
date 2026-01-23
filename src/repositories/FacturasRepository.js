import prisma from '../config/prisma.js'

class FacturasRepository {
  async createFactura(data) {
    const { items, ...rest } = data
    const created = await prisma.facturas.create({
      data: {
        ...rest,
        items: { create: items },
      },
      include: { items: true, pagos: true },
    })
    return created
  }

  async findById(id) {
    return prisma.facturas.findUnique({
      where: { id: Number(id) },
      include: { items: true, pagos: true },
    })
  }

  async addPago(facturaId, pagoData) {
    return prisma.pagos.create({
      data: { facturaId: Number(facturaId), ...pagoData },
    })
  }

  async sumPagos(facturaId) {
    const res = await prisma.pagos.aggregate({
      where: { facturaId: Number(facturaId) },
      _sum: { monto: true },
    })
    return res._sum.monto || 0
  }
}

export default new FacturasRepository()
