import prisma from '../config/prisma.js'

class PlanesCoberturaRepository {
  async create(data) {
    return prisma.planesCobertura.create({ data })
  }

  async findAll() {
    return prisma.planesCobertura.findMany()
  }

  async findById(id) {
    return prisma.planesCobertura.findUnique({
      where: { id: parseInt(id) },
    })
  }

  async findByIdOrFail(id) {
    const found = await this.findById(id)
    if (!found) throw new Error('Plan no encontrada')
    return found
  }

  async update(id, data) {
    return prisma.planesCobertura.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.planesCobertura.delete({ where: { id: parseInt(id) } })
  }
}

export default new PlanesCoberturaRepository()
