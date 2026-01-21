import express from 'express'
import AseguradorasController from '../controllers/AseguradorasController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Aseguradoras
 *     description: Operaciones sobre aseguradoras
 */

/**
 * @openapi
 * /aseguradoras:
 *   get:
 *     tags: [Aseguradoras]
 *     summary: Obtener todas las aseguradoras
 *     responses:
 *       200:
 *         description: Lista de aseguradoras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aseguradora'
 */

/**
 * @openapi
 * /aseguradoras:
 *   post:
 *     tags: [Aseguradoras]
 *     summary: Crear una nueva aseguradora
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AseguradoraCreate'
 *     responses:
 *       201:
 *         description: Aseguradora creada
 */

/**
 * @openapi
 * /aseguradoras/{id}:
 *   get:
 *     tags: [Aseguradoras]
 *     summary: Obtener una aseguradora por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aseguradora
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Aseguradora'
 */

/**
 * @openapi
 * /aseguradoras/{id}:
 *   patch:
 *     tags: [Aseguradoras]
 *     summary: Actualizar una aseguradora
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
 *             $ref: '#/components/schemas/AseguradoraUpdate'
 *     responses:
 *       200:
 *         description: Aseguradora actualizada
 */

/**
 * @openapi
 * /aseguradoras/{id}:
 *   delete:
 *     tags: [Aseguradoras]
 *     summary: Desactivar una aseguradora
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Eliminado
 */
router.get('/', AseguradorasController.getAllAseguradoras)
router.post('/', AseguradorasController.createAseguradora)
router.get('/:id', AseguradorasController.getAseguradoraById)
router.patch('/:id', AseguradorasController.patchAseguradora)
router.delete('/:id', AseguradorasController.deleteAseguradora)

export default router
