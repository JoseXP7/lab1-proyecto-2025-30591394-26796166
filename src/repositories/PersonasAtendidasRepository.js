import prisma from '../config/prisma.js'

class PersonasAtendidasRepository {
  async create(data) {
    return prisma.personasAtendidas.create({
      data,
    })
  }

  async findAll() {
    return prisma.personasAtendidas.findMany()
  }

  async findById(id) {
    return prisma.personasAtendidas.findUnique({
      where: { id: parseInt(id) },
    })
  }

  async findByNumeroDocumento(numeroDocumento) {
    return prisma.personasAtendidas.findUnique({
      where: { numeroDocumento },
    })
  }

  async findBySexo(sexo) {
    return prisma.personasAtendidas.findMany({
      where: { sexo },
    })
  }

  async update(id, data) {
    return prisma.personasAtendidas.update({
      where: { id: parseInt(id) },
      data,
    })
  }

  async delete(id) {
    return prisma.personasAtendidas.delete({
      where: { id: parseInt(id) },
    })
  }
}

export default new PersonasAtendidasRepository()
