import express from 'express'
import OrdenesController from '../controllers/OrdenesController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  - name: Ordenes
 *    description: Gestión de órdenes y prestaciones
 */

router.post('/', OrdenesController.createOrden)
router.get('/', OrdenesController.getAllOrdenes)
router.get('/:id', OrdenesController.getOrdenById)
router.patch('/:id', OrdenesController.updateOrden)
router.delete('/:id', OrdenesController.deleteOrden)

export default router
