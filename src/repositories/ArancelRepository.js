import prisma from '../config/prisma.js'

class ArancelRepository {
  create(data) {
    return prisma.arancel.create({ data })
  }

  findAll() {
    return prisma.arancel.findMany({
      include: { prestacion: true, plan: true },
    })
  }

  findById(id) {
    return prisma.arancel.findUnique({
      where: { id: parseInt(id) },
      include: { prestacion: true, plan: true },
    })
  }

  update(id, data) {
    return prisma.arancel.update({ where: { id: parseInt(id) }, data })
  }

  delete(id) {
    return prisma.arancel.delete({ where: { id: parseInt(id) } })
  }
}

export default new ArancelRepository()
