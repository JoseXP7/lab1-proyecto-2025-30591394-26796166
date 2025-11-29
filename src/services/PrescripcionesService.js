import PrescripcionesRepository from '../repositories/PrescripcionesRepository.js'
import EpisodiosRepository from '../repositories/EpisodiosRepository.js'

class PrescripcionesService {
  async createPrescripcion(data) {
    const episodio = await EpisodiosRepository.findById(data.episodioId)
    if (!episodio)
      throw new Error(`Episodio con ID ${data.episodioId} no encontrado.`)
    return PrescripcionesRepository.create(data)
  }

  async getAllPrescripciones() {
    return PrescripcionesRepository.findAll()
  }

  async getPrescripcionById(id) {
    const p = await PrescripcionesRepository.findById(id)
    if (!p) throw new Error('Prescripción no encontrada.')
    return p
  }

  async updatePrescripcion(id, data) {
    const existing = await PrescripcionesRepository.findById(id)
    if (!existing)
      throw new Error('Prescripción no encontrada para actualizar.')
    if (data.episodioId) {
      const ep = await EpisodiosRepository.findById(data.episodioId)
      if (!ep)
        throw new Error(`Episodio con ID ${data.episodioId} no encontrado.`)
    }
    return PrescripcionesRepository.update(id, data)
  }

  async deletePrescripcion(id) {
    const existing = await PrescripcionesRepository.findById(id)
    if (!existing) throw new Error('Prescripción no encontrada para eliminar.')
    return PrescripcionesRepository.delete(id)
  }
}

export default new PrescripcionesService()
