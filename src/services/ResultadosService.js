import ResultadosRepository from '../repositories/ResultadosRepository.js'
import OrdenesRepository from '../repositories/OrdenesRepository.js'

class ResultadosService {
  async createResultado(data) {
    const orden = await OrdenesRepository.findById(data.ordenId)
    if (!orden) throw new Error(`Orden con ID ${data.ordenId} no encontrada.`)
    return ResultadosRepository.create(data)
  }

  async getAllResultados() {
    return ResultadosRepository.findAll()
  }

  async getResultadoById(id) {
    const r = await ResultadosRepository.findById(id)
    if (!r) throw new Error('Resultado no encontrado.')
    return r
  }

  async updateResultado(id, data) {
    const existing = await ResultadosRepository.findById(id)
    if (!existing) throw new Error('Resultado no encontrado para actualizar.')
    if (data.ordenId) {
      const orden = await OrdenesRepository.findById(data.ordenId)
      if (!orden) throw new Error(`Orden con ID ${data.ordenId} no encontrada.`)
    }
    return ResultadosRepository.update(id, data)
  }

  async deleteResultado(id) {
    const existing = await ResultadosRepository.findById(id)
    if (!existing) throw new Error('Resultado no encontrado para eliminar.')
    return ResultadosRepository.delete(id)
  }
}

export default new ResultadosService()
