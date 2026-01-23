import PrestacionesRepository from '../repositories/PrestacionesRepository.js'

class PrestacionesService {
  async create(data) {
    const existing = await PrestacionesRepository.findByCodigo(data.codigo)
    if (existing) throw new Error('Prestación ya existe')
    return PrestacionesRepository.create(data)
  }

  async list() {
    return PrestacionesRepository.findAll()
  }

  async getByCodigo(codigo) {
    const p = await PrestacionesRepository.findByCodigo(codigo)
    if (!p) throw new Error('Prestación no encontrada')
    return p
  }

  async update(codigo, data) {
    await this.getByCodigo(codigo)
    return PrestacionesRepository.update(codigo, data)
  }

  async delete(codigo) {
    await this.getByCodigo(codigo)
    return PrestacionesRepository.delete(codigo)
  }
}

export default new PrestacionesService()
