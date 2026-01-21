import PlanesCoberturaRepository from "../repositories/PlanesCoberturaRepository.js"
import AseguradorasRepository from "../repositories/AseguradorasRepository.js"

class PlanesCoberturaService {
  async create(data) {
    const aseguradora = await AseguradorasRepository.findById(
      data.aseguradoraId,
    )
    if (!aseguradora) throw new Error("Aseguradora no encontrada")
    return PlanesCoberturaRepository.create(data)
  }

  async list(filters) {
    return PlanesCoberturaRepository.findAll(filters)
  }

  async update(id, data) {
    await PlanesCoberturaRepository.findByIdOrFail(id)
    return PlanesCoberturaRepository.update(id, data)
  }

  async deactivate(id) {
    return PlanesCoberturaRepository.update(id, { estado: "INACTIVO" })
  }
}

export default new PlanesCoberturaService()
