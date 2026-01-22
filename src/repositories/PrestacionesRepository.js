import prisma from '../config/prisma.js'

class PrestacionesRepository {
  create(data) {
    return prisma.prestaciones.create({ data })
  }

  findAll() {
    return prisma.prestaciones.findMany()
  }

  findByCodigo(codigo) {
    return prisma.prestaciones.findUnique({ where: { codigo } })
  }

  update(codigo, data) {
    return prisma.prestaciones.update({ where: { codigo }, data })
  }

  delete(codigo) {
    return prisma.prestaciones.delete({ where: { codigo } })
  }
}

export default new PrestacionesRepository()
