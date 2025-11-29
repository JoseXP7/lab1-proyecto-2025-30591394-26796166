import express from 'express'
import PrescripcionesController from '../controllers/PrescripcionesController.js'

const router = express.Router()

router.post('/', PrescripcionesController.createPrescripcion)
router.get('/', PrescripcionesController.getAllPrescripciones)
router.get('/:id', PrescripcionesController.getPrescripcionById)
router.patch('/:id', PrescripcionesController.updatePrescripcion)
router.delete('/:id', PrescripcionesController.deletePrescripcion)

export default router
