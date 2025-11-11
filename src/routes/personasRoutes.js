import express from 'express'
import PersonasAtentidasController from '../controllers/PersonasAtentidasController.js'

const router = express.Router()

router.get('/', PersonasAtentidasController.getAllPersonasAtendidas)
router.get('/:id', PersonasAtentidasController.getPersonaAtendidaById)
router.post('/', PersonasAtentidasController.createPersonaAtendida)
router.patch('/:id', PersonasAtentidasController.updatePersonaAtendida)
router.delete('/:id', PersonasAtentidasController.deletePersonaAtendida)

export default router
