import prisma from "../config/prisma.js"

class AfiliacionesRepository {
  create(data) {
    return prisma.afiliaciones.create({ data })
  }

  findAll() {
    return prisma.afiliaciones.findMany({
      include: {
        persona: true,
        plan: {
          include: { aseguradora: true },
        },
      },
    })
  }

  findById(id) {
    return prisma.afiliaciones.findUnique({
      where: { id: parseInt(id) },
      include: {
        persona: true,
        plan: {
          include: { aseguradora: true },
        },
      },
    })
  }

  update(id, data) {
    return prisma.afiliaciones.update({
      where: { id: parseInt(id) },
      data,
    })
  }
}

export default new AfiliacionesRepository()
