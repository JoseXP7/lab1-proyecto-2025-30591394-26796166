import PersonasAtendidasRepository from '../repositories/PersonasAtendidasRepository.js'

class PersonasAtendidasService {
  async createPersonaAtendida(data) {
    const existingPersona =
      await PersonasAtendidasRepository.findByNumeroDocumento(
        data.numeroDocumento
      )
    if (existingPersona) {
      throw new Error('Ya existe una persona con este número de documento.')
    }
    return PersonasAtendidasRepository.create(data)
  }

  async getAllPersonasAtendidas() {
    return PersonasAtendidasRepository.findAll()
  }

  async getPersonaAtendidaById(id) {
    const persona = await PersonasAtendidasRepository.findById(id)
    if (!persona) {
      throw new Error('Persona no encontrada.')
    }
    return persona
  }

  async updatePersonaAtendida(id, data) {
    const existingPersona = await PersonasAtendidasRepository.findById(id)
    if (!existingPersona) {
      throw new Error('Persona no encontrada para actualizar.')
    }
    return PersonasAtendidasRepository.update(id, data)
  }

  async deletePersonaAtendida(id) {
    const existingPersona = await PersonasAtendidasRepository.findById(id)
    if (!existingPersona) {
      throw new Error('Persona no encontrada para eliminar.')
    }
    return PersonasAtendidasRepository.delete(id)
  }
}

export default new PersonasAtendidasService()
