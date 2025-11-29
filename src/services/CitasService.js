import CitasRepository from '../repositories/CitasRepository.js'
import PersonasAtendidasRepository from '../repositories/PersonasAtendidasRepository.js'
import ProfesionalesRepository from '../repositories/ProfesionalesRepository.js'
import UnidadesAtencionRepository from '../repositories/UnidadesAtencionRepository.js'

class CitasService {
  async createCita(data) {
    const { personaId, profesionalId, unidadId, inicio, fin } = data

    // 1. Validar existencia de dependencias (Llaves Foráneas)
    const paciente = await PersonasAtendidasRepository.findById(personaId)
    if (!paciente) {
      throw new Error(`Persona con ID ${personaId} no encontrado.`)
    }

    const profesional = await ProfesionalesRepository.findById(profesionalId)
    if (!profesional) {
      throw new Error(`Profesional con ID ${profesionalId} no encontrado.`)
    }

    const unidad = await UnidadesAtencionRepository.findById(unidadId)
    if (!unidad) {
      throw new Error(`Unidad de Atención con ID ${unidadId} no encontrada.`)
    }

    // 2. Lógica de Negocio: Verificar disponibilidad (Conflicto de horario)
    // Busca si el profesional tiene otra cita a la misma hora exacta
    const conflict = await CitasRepository.findConflict(profesionalId, inicio)

    if (conflict) {
      const dateStr = new Date(inicio).toISOString()
      throw new Error(
        `El Profesional ya tiene una cita programada a la hora: ${dateStr}`
      )
    }

    // Validación básica: inicio < fin
    if (new Date(inicio) >= new Date(fin)) {
      throw new Error('El campo "inicio" debe ser anterior a "fin".')
    }

    // 3. Crear la cita
    return CitasRepository.create(data)
  }

  async getAllCitas() {
    return CitasRepository.findAll()
  }

  async getCitaById(id) {
    const cita = await CitasRepository.findById(id)
    if (!cita) {
      throw new Error('Cita no encontrada.')
    }
    return cita
  }

  async updateCita(id, data) {
    const existingCita = await CitasRepository.findById(id)
    if (!existingCita) {
      throw new Error('Cita no encontrada para actualizar.')
    }

    // Si algún ID de dependencia se actualiza, chequear su existencia
    if (data.pacienteId) {
      const paciente = await PersonasAtendidasRepository.findById(
        data.pacienteId
      )
      if (!paciente)
        throw new Error(`Paciente con ID ${data.pacienteId} no encontrado.`)
    }
    if (data.profesionalId) {
      const profesional = await ProfesionalesRepository.findById(
        data.profesionalId
      )
      if (!profesional)
        throw new Error(
          `Profesional con ID ${data.profesionalId} no encontrado.`
        )
    }
    if (data.unidadId) {
      const unidad = await UnidadesAtencionRepository.findById(data.unidadId)
      if (!unidad)
        throw new Error(
          `Unidad de Atención con ID ${data.unidadId} no encontrada.`
        )
    }

    // Nota: Una lógica más avanzada requeriría chequear conflictos de horario en la actualización también.

    return CitasRepository.update(id, data)
  }

  async deleteCita(id) {
    const existingCita = await CitasRepository.findById(id)
    if (!existingCita) {
      throw new Error('Cita no encontrada para eliminar.')
    }
    return CitasRepository.delete(id)
  }
}

export default new CitasService()
