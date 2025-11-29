import OrdenesRepository from '../repositories/OrdenesRepository.js'
import EpisodiosRepository from '../repositories/EpisodiosRepository.js'

class OrdenesService {
  async createOrden(data) {
    const episodio = await EpisodiosRepository.findById(data.episodioId)
    if (!episodio)
      throw new Error(`Episodio con ID ${data.episodioId} no encontrado.`)
    return OrdenesRepository.create(data)
  }

  async getAllOrdenes() {
    return OrdenesRepository.findAll()
  }

  async getOrdenById(id) {
    const orden = await OrdenesRepository.findById(id)
    if (!orden) throw new Error('Orden no encontrada.')
    return orden
  }

  async updateOrden(id, data) {
    const existing = await OrdenesRepository.findById(id)
    if (!existing) throw new Error('Orden no encontrada para actualizar.')
    if (data.episodioId) {
      const episodio = await EpisodiosRepository.findById(data.episodioId)
      if (!episodio)
        throw new Error(`Episodio con ID ${data.episodioId} no encontrado.`)
    }
    return OrdenesRepository.update(id, data)
  }

  async deleteOrden(id) {
    const existing = await OrdenesRepository.findById(id)
    if (!existing) throw new Error('Orden no encontrada para eliminar.')
    return OrdenesRepository.delete(id)
  }
}

export default new OrdenesService()
