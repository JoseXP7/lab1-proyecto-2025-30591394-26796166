import prisma from '../config/prisma.js'

class PrescripcionesRepository {
  async create(data) {
    return prisma.prescripciones.create({ data })
  }

  async findAll() {
    return prisma.prescripciones.findMany({ include: { episodio: true } })
  }

  async findById(id) {
    return prisma.prescripciones.findUnique({
      where: { id: parseInt(id) },
      include: { episodio: true },
    })
  }

  async update(id, data) {
    return prisma.prescripciones.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.prescripciones.delete({ where: { id: parseInt(id) } })
  }
}

export default new PrescripcionesRepository()
