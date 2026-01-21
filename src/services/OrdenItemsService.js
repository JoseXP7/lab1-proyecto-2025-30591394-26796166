import OrdenItemsRepository from '../repositories/OrdenItemsRepository.js'
import OrdenesRepository from '../repositories/OrdenesRepository.js'

class OrdenItemsService {
  async create(ordenId, data) {
    const orden = await OrdenesRepository.findById(ordenId)
    if (!orden) throw new Error('Orden no encontrada')
    const payload = { ...data, ordenId: parseInt(ordenId) }
    return OrdenItemsRepository.create(payload)
  }

  async listByOrden(ordenId) {
    const orden = await OrdenesRepository.findById(ordenId)
    if (!orden) throw new Error('Orden no encontrada')
    return OrdenItemsRepository.findByOrdenId(ordenId)
  }

  async getById(id) {
    const item = await OrdenItemsRepository.findById(id)
    if (!item) throw new Error('Item no encontrado')
    return item
  }

  async update(id, data) {
    await this.getById(id)
    return OrdenItemsRepository.update(id, data)
  }

  async delete(id) {
    await this.getById(id)
    return OrdenItemsRepository.delete(id)
  }
}

export default new OrdenItemsService()
