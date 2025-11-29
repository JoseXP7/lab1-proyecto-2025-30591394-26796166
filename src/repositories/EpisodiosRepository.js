import prisma from '../config/prisma.js'

class EpisodiosRepository {
  async create(data) {
    return prisma.episodiosAtencion.create({ data })
  }

  async findAll() {
    return prisma.episodiosAtencion.findMany({ include: { persona: true } })
  }

  async findByPersonaId(personaId) {
    return prisma.episodiosAtencion.findMany({
      where: { personaId: parseInt(personaId) },
      include: { persona: true },
    })
  }

  async findById(id) {
    return prisma.episodiosAtencion.findUnique({
      where: { id: parseInt(id) },
      include: { persona: true },
    })
  }

  async update(id, data) {
    return prisma.episodiosAtencion.update({
      where: { id: parseInt(id) },
      data,
    })
  }

  async delete(id) {
    return prisma.episodiosAtencion.delete({ where: { id: parseInt(id) } })
  }
}

export default new EpisodiosRepository()
