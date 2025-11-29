import prisma from '../config/prisma.js'

class ResultadosRepository {
  async create(data) {
    return prisma.resultados.create({ data })
  }

  async findAll() {
    return prisma.resultados.findMany({ include: { orden: true } })
  }

  async findById(id) {
    return prisma.resultados.findUnique({
      where: { id: parseInt(id) },
      include: { orden: true },
    })
  }

  async update(id, data) {
    return prisma.resultados.update({ where: { id: parseInt(id) }, data })
  }

  async delete(id) {
    return prisma.resultados.delete({ where: { id: parseInt(id) } })
  }
}

export default new ResultadosRepository()
