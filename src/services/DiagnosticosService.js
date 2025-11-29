import DiagnosticosRepository from '../repositories/DiagnosticosRepository.js'
import EpisodiosRepository from '../repositories/EpisodiosRepository.js'

class DiagnosticosService {
  async addDiagnosticos(episodioId, items) {
    const episodio = await EpisodiosRepository.findById(episodioId)
    if (!episodio) throw new Error('Episodio no encontrado')

    return DiagnosticosRepository.createMany(episodioId, items)
  }
}

export default new DiagnosticosService()
