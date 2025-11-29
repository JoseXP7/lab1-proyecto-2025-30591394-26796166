import EpisodiosRepository from '../repositories/EpisodiosRepository.js'
import PersonasAtendidasRepository from '../repositories/PersonasAtendidasRepository.js'

class EpisodiosService {
  async createEpisodio(data) {
    const persona = await PersonasAtendidasRepository.findById(data.personaId)
    if (!persona)
      throw new Error(`Persona con ID ${data.personaId} no encontrada.`)
    return EpisodiosRepository.create(data)
  }

  async getAllEpisodios() {
    return EpisodiosRepository.findAll()
  }

  async getEpisodiosByPersona(personaId) {
    return EpisodiosRepository.findByPersonaId(personaId)
  }

  async getEpisodioById(id) {
    const episodio = await EpisodiosRepository.findById(id)
    if (!episodio) throw new Error('Episodio no encontrado.')
    return episodio
  }

  async updateEpisodio(id, data) {
    const existing = await EpisodiosRepository.findById(id)
    if (!existing) throw new Error('Episodio no encontrado para actualizar.')
    if (data.personaId) {
      const persona = await PersonasAtendidasRepository.findById(data.personaId)
      if (!persona)
        throw new Error(`Persona con ID ${data.personaId} no encontrada.`)
    }
    return EpisodiosRepository.update(id, data)
  }

  async deleteEpisodio(id) {
    const existing = await EpisodiosRepository.findById(id)
    if (!existing) throw new Error('Episodio no encontrado para eliminar.')
    return EpisodiosRepository.delete(id)
  }
}

export default new EpisodiosService()
