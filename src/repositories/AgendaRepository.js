import prisma from '../config/prisma.js'

class AgendaRepository {
  async create(data) {
    return prisma.agenda.create({ data })
  }

  async findByFilters({ profesionalId, unidadId, inicio, fin }) {
    const where = {}
    if (profesionalId) where.profesionalId = parseInt(profesionalId)
    if (unidadId) where.unidadId = parseInt(unidadId)
    if (inicio && fin) {
      where.AND = [
        { inicio: { gte: new Date(inicio) } },
        { fin: { lte: new Date(fin) } },
      ]
    } else if (inicio) {
      where.inicio = { gte: new Date(inicio) }
    } else if (fin) {
      where.fin = { lte: new Date(fin) }
    }

    return prisma.agenda.findMany({
      where,
      include: { profesional: true, unidad: true },
    })
  }

  async findById(id) {
    return prisma.agenda.findUnique({
      where: { id: parseInt(id) },
      include: { profesional: true, unidad: true },
    })
  }

  async update(id, data) {
    return prisma.agenda.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.agenda.delete({ where: { id: parseInt(id) } })
  }
}

export default new AgendaRepository()
