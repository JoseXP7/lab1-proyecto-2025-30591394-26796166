import prisma from '../config/prisma.js'

class DiagnosticosRepository {
  async createMany(episodioId, items) {
    // create items one by one to set episodioId
    const created = []
    for (const it of items) {
      const row = await prisma.diagnosticos.create({
        data: { ...it, episodioId: parseInt(episodioId) },
      })
      created.push(row)
    }
    return created
  }
}

export default new DiagnosticosRepository()
