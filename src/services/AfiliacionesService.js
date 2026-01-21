import AfiliacionesRepository from "../repositories/AfiliacionesRepository.js"
import PersonasRepository from "../repositories/PersonasAtendidasRepository.js"
import PlanesRepository from "../repositories/PlanesCoberturaRepository.js"

class AfiliacionesService {
  async create(data) {
    const persona = await PersonasRepository.findById(data.personaId)
    if (!persona) throw new Error("Persona no encontrada")

    const plan = await PlanesRepository.findById(data.planId)
    if (!plan) throw new Error("Plan de cobertura no encontrado")

    return AfiliacionesRepository.create(data)
  }

  async list() {
    return AfiliacionesRepository.findAll()
  }

  async getById(id) {
    const afiliacion = await AfiliacionesRepository.findById(id)
    if (!afiliacion) throw new Error("Afiliación no encontrada")
    return afiliacion
  }

  async update(id, data) {
    await this.getById(id)
    return AfiliacionesRepository.update(id, data)
  }
}

export default new AfiliacionesService()
