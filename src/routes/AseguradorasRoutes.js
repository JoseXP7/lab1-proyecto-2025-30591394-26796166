import express from 'express'
import AseguradorasController from '../controllers/AseguradorasController.js'

const router = express.Router()

// escribir open api aqui
router.get('/', AseguradorasController.getAllAseguradoras)
router.post('/', AseguradorasController.createAseguradora)
router.get('/:id', AseguradorasController.getAseguradoraById)
router.patch('/:id', AseguradorasController.patchAseguradora)
router.delete('/:id', AseguradorasController.deleteAseguradora)

export default router
