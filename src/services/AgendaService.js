import AgendaRepository from '../repositories/AgendaRepository.js'
import ProfesionalesRepository from '../repositories/ProfesionalesRepository.js'
import UnidadesAtencionRepository from '../repositories/UnidadesAtencionRepository.js'

class AgendaService {
  async createAgenda(data) {
    // verificar existencia de profesional y unidad
    const profesional = await ProfesionalesRepository.findById(
      data.profesionalId
    )
    if (!profesional) throw new Error('Profesional no encontrado')

    const unidad = await UnidadesAtencionRepository.findById(data.unidadId)
    if (!unidad) throw new Error('Unidad de atención no encontrada')

    // validación simple: inicio < fin
    if (new Date(data.inicio) >= new Date(data.fin))
      throw new Error('"inicio" debe ser anterior a "fin"')

    return AgendaRepository.create(data)
  }

  async getAgenda(filters) {
    return AgendaRepository.findByFilters(filters)
  }

  async updateAgendaEstado(id, estado) {
    // Asegurarse que existe
    const existing = await AgendaRepository.findById(id)
    if (!existing) throw new Error('Agenda no encontrada')
    return AgendaRepository.update(id, { estado })
  }
}

export default new AgendaService()
