import express from 'express'
import PrestacionesController from '../controllers/PrestacionesController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Prestaciones
 *     description: Catálogo de prestaciones
 */

/**
 * @openapi
 * /prestaciones:
 *   get:
 *     tags: [Prestaciones]
 *     summary: Listar prestaciones
 *     responses:
 *       200:
 *         description: Lista de prestaciones
 */
router.get('/', PrestacionesController.listPrestaciones)

/**
 * @openapi
 * /prestaciones:
 *   post:
 *     tags: [Prestaciones]
 *     summary: Crear una prestación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestacion'
 *     responses:
 *       201:
 *         description: Prestación creada
 */
router.post('/', PrestacionesController.createPrestacion)

/**
 * @openapi
 * /prestaciones/{codigo}:
 *   get:
 *     tags: [Prestaciones]
 *     summary: Obtener prestación por código
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prestación
 */
router.get('/:codigo', PrestacionesController.getPrestacion)

/**
 * @openapi
 * /prestaciones/{codigo}:
 *   patch:
 *     tags: [Prestaciones]
 *     summary: Actualizar prestación
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Prestacion'
 *     responses:
 *       200:
 *         description: Prestación actualizada
 */
router.patch('/:codigo', PrestacionesController.updatePrestacion)

/**
 * @openapi
 * /prestaciones/{codigo}:
 *   delete:
 *     tags: [Prestaciones]
 *     summary: Eliminar prestación
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado
 */
router.delete('/:codigo', PrestacionesController.deletePrestacion)

export default router
