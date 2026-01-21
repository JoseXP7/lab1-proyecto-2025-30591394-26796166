import prisma from '../config/prisma.js'

class OrdenItemsRepository {
  async create(data) {
    return prisma.ordenItems.create({ data })
  }

  async findByOrdenId(ordenId) {
    return prisma.ordenItems.findMany({ where: { ordenId: parseInt(ordenId) } })
  }

  async findById(id) {
    return prisma.ordenItems.findUnique({ where: { id: parseInt(id) } })
  }

  async update(id, data) {
    return prisma.ordenItems.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.ordenItems.delete({ where: { id: parseInt(id) } })
  }
}

export default new OrdenItemsRepository()
