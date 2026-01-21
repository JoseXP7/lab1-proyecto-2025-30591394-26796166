import prisma from "../config/prisma.js"

class AseguradorasRepository {
  create(data) {
    return prisma.aseguradoras.create({ data })
  }

  findAll() {
    return prisma.aseguradoras.findMany()
  }

  findById(id) {
    return prisma.aseguradoras.findUnique({ where: { id: parseInt(id) } })
  }

  update(id, data) {
    return prisma.aseguradoras.update({
      where: { id: parseInt(id) },
      data,
    })
  }
}

export default new AseguradorasRepository()
