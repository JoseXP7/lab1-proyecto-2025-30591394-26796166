import NotasClinicasRepository from '../repositories/NotasClinicasRepository.js'
import EpisodiosRepository from '../repositories/EpisodiosRepository.js'
import ProfesionalesRepository from '../repositories/ProfesionalesRepository.js'

class NotasClinicasService {
  async createNota(episodioId, data) {
    const episodio = await EpisodiosRepository.findById(episodioId)
    if (!episodio) throw new Error('Episodio no encontrado')

    const profesional = await ProfesionalesRepository.findById(
      data.profesionalId
    )
    if (!profesional) throw new Error('Profesional no encontrado')

    // version handling: prisma NotasClinicas has unique(episodioId, version). We'll set version = 1 + max existing
    const existing = await NotasClinicasRepository.findByEpisodio(episodioId)
    const maxVersion = existing.length ? existing[0].version : 0
    const toCreate = {
      ...data,
      episodioId: parseInt(episodioId),
      version: maxVersion + 1,
    }

    return NotasClinicasRepository.create(toCreate)
  }
}

export default new NotasClinicasService()
