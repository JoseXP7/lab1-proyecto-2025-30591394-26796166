import prisma from '../config/prisma.js'

class OrdenesRepository {
  async create(data) {
    return prisma.ordenes.create({ data })
  }

  async findAll() {
    return prisma.ordenes.findMany({ include: { episodio: true } })
  }

  async findById(id) {
    return prisma.ordenes.findUnique({
      where: { id: parseInt(id) },
      include: { episodio: true },
    })
  }

  async update(id, data) {
    return prisma.ordenes.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.ordenes.delete({ where: { id: parseInt(id) } })
  }
}

export default new OrdenesRepository()
