import AseguradorasRepository from "../repositories/AseguradorasRepository.js"

class AseguradorasService {
  async create(data) {
    return AseguradorasRepository.create(data)
  }

  async list() {
    return AseguradorasRepository.findAll()
  }

  async getById(id) {
    const aseguradora = await AseguradorasRepository.findById(id)
    if (!aseguradora) throw new Error("Aseguradora no encontrada")
    return aseguradora
  }

  async update(id, data) {
    await this.getById(id)
    return AseguradorasRepository.update(id, data)
  }

  async deactivate(id) {
    await this.getById(id)
    return AseguradorasRepository.update(id, { estado: "INACTIVA" })
  }
}

export default new AseguradorasService()
