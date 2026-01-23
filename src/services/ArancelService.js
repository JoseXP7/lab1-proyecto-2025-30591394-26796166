import ArancelRepository from '../repositories/ArancelRepository.js'
import PrestacionesRepository from '../repositories/PrestacionesRepository.js'
import PlanesCoberturaRepository from '../repositories/PlanesCoberturaRepository.js'

class ArancelService {
  async create(data) {
    const prest = await PrestacionesRepository.findByCodigo(
      data.prestacionCodigo,
    )
    if (!prest) throw new Error('Prestación no encontrada')
    if (data.planId) {
      const plan = await PlanesCoberturaRepository.findById(data.planId)
      if (!plan) throw new Error('Plan no encontrado')
    }
    if (
      data.vigenteDesde &&
      data.vigenteHasta &&
      data.vigenteDesde > data.vigenteHasta
    )
      throw new Error('vigenteDesde debe ser anterior o igual a vigenteHasta')
    return ArancelRepository.create(data)
  }

  async list() {
    return ArancelRepository.findAll()
  }

  async getById(id) {
    const r = await ArancelRepository.findById(id)
    if (!r) throw new Error('Arancel no encontrado')
    return r
  }

  async update(id, data) {
    await this.getById(id)
    if (data.prestacionCodigo) {
      const prest = await PrestacionesRepository.findByCodigo(
        data.prestacionCodigo,
      )
      if (!prest) throw new Error('Prestación no encontrada')
    }
    if (data.planId) {
      const plan = await PlanesCoberturaRepository.findById(data.planId)
      if (!plan) throw new Error('Plan no encontrado')
    }
    if (
      data.vigenteDesde &&
      data.vigenteHasta &&
      data.vigenteDesde > data.vigenteHasta
    )
      throw new Error('vigenteDesde debe ser anterior o igual a vigenteHasta')
    return ArancelRepository.update(id, data)
  }

  async delete(id) {
    await this.getById(id)
    return ArancelRepository.delete(id)
  }
}

export default new ArancelService()
