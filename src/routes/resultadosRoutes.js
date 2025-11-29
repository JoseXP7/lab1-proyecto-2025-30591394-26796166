import express from 'express'
import ResultadosController from '../controllers/ResultadosController.js'

const router = express.Router()

router.post('/', ResultadosController.createResultado)
router.get('/', ResultadosController.getAllResultados)
router.get('/:id', ResultadosController.getResultadoById)
router.patch('/:id', ResultadosController.updateResultado)
router.delete('/:id', ResultadosController.deleteResultado)

export default router
