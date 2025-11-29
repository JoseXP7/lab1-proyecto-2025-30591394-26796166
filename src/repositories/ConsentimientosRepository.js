import prisma from '../config/prisma.js'

class ConsentimientosRepository {
  async create(data) {
    return prisma.consentimientos.create({ data })
  }
}

export default new ConsentimientosRepository()
