import prisma from "../config/prisma.js"

class ArancelRepository {
  create(data) {
    return prisma.arancel.create({ data })
  }

  findAll() {
    return prisma.arancel.findMany({
      include: { prestacion: true, plan: true },
    })
  }

  findById(id) {
    return prisma.arancel.findUnique({
      where: { id: parseInt(id) },
      include: { prestacion: true, plan: true },
    })
  }

  update(id, data) {
    return prisma.arancel.update({ where: { id: parseInt(id) }, data })
  }

  delete(id) {
    return prisma.arancel.delete({ where: { id: parseInt(id) } })
  }

  async findActiveByPrestacionAndPlan(
    prestacionCodigo,
    planOrAsegId,
    fecha = new Date(),
  ) {
    const date = new Date(fecha)

    // Determine plan IDs to filter by. If planOrAsegId corresponds to a plan id,
    // use it. Otherwise treat it as an aseguradora id and gather its plans.
    let planIds = []
    if (planOrAsegId !== undefined && planOrAsegId !== null) {
      const asNumber = Number(planOrAsegId)
      // try find plan by id
      const plan = await prisma.planesCobertura.findUnique({
        where: { id: asNumber },
      })
      if (plan) {
        planIds = [plan.id]
      } else {
        const plans = await prisma.planesCobertura.findMany({
          where: { aseguradoraId: asNumber },
          select: { id: true },
        })
        planIds = plans.map((p) => p.id)
      }
    }

    const where = {
      prestacionCodigo,
      vigenteDesde: { lte: date },
      vigenteHasta: { gte: date },
      OR: planIds.length
        ? [{ planId: { in: planIds } }, { planId: null }]
        : [{ planId: null }],
    }

    return prisma.arancel.findFirst({
      where,
      include: { prestacion: true, plan: true },
    })
  }
}

export default new ArancelRepository()
