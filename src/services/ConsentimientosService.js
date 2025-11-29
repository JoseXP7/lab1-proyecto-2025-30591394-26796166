import ConsentimientosRepository from '../repositories/ConsentimientosRepository.js'
import PersonasRepository from '../repositories/PersonasAtendidasRepository.js'

class ConsentimientosService {
  async createConsentimiento(data) {
    const persona = await PersonasRepository.findById(data.personaId)
    if (!persona) throw new Error('Persona no encontrada')
    return ConsentimientosRepository.create(data)
  }
}

export default new ConsentimientosService()
