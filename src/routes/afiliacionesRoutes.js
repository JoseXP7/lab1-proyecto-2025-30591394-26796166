import express from 'express'
import AfiliacionesController from '../controllers/AfiliacionesController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Afiliaciones
 *     description: Operaciones sobre afiliaciones
 */

/**
 * @openapi
 * /afiliaciones:
 *   get:
 *     tags: [Afiliaciones]
 *     summary: Listar afiliaciones
 *     responses:
 *       200:
 *         description: Lista de afiliaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Afiliacion'
 */

/**
 * @openapi
 * /afiliaciones:
 *   post:
 *     tags: [Afiliaciones]
 *     summary: Crear una afiliación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AfiliacionCreate'
 *     responses:
 *       201:
 *         description: Afiliación creada
 */

/**
 * @openapi
 * /afiliaciones/{id}:
 *   get:
 *     tags: [Afiliaciones]
 *     summary: Obtener una afiliación por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Afiliación
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Afiliacion'
 */

/**
 * @openapi
 * /afiliaciones/{id}:
 *   patch:
 *     tags: [Afiliaciones]
 *     summary: Actualizar una afiliación
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AfiliacionUpdate'
 *     responses:
 *       200:
 *         description: Afiliación actualizada
 */

router.get('/', AfiliacionesController.listAfiliaciones)
router.post('/', AfiliacionesController.createAfiliacion)
router.get('/:id', AfiliacionesController.getAfiliacionById)
router.patch('/:id', AfiliacionesController.updateAfiliacion)

export default router
