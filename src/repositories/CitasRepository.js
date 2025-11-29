import prisma from '../config/prisma.js'

class CitasRepository {
  async create(data) {
    return prisma.citas.create({ data })
  }

  // Obtiene todas las citas (incluyendo relaciones para contexto)
  async findAll() {
    return prisma.citas.findMany({
      include: {
        persona: true,
        profesional: true,
        unidad: true,
      },
    })
  }

  async findById(id) {
    return prisma.citas.findUnique({
      where: { id: parseInt(id) },
      include: {
        persona: true,
        profesional: true,
        unidad: true,
      },
    })
  }

  async findConflict(profesionalId, fechaHora) {
    return prisma.citas.findFirst({
      where: {
        profesionalId: parseInt(profesionalId),
        inicio: fechaHora,
      },
    })
  }

  async update(id, data) {
    return prisma.citas.update({
      where: { id: parseInt(id) },
      data,
    })
  }

  async delete(id) {
    return prisma.citas.delete({
      where: { id: parseInt(id) },
    })
  }
}

export default new CitasRepository()
