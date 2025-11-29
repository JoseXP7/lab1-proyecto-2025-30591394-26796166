import prisma from '../config/prisma.js'

class NotasClinicasRepository {
  async create(data) {
    return prisma.notasClinicas.create({ data })
  }

  async findByEpisodio(episodioId) {
    return prisma.notasClinicas.findMany({
      where: { episodioId: parseInt(episodioId) },
      orderBy: { version: 'desc' },
    })
  }
}

export default new NotasClinicasRepository()
