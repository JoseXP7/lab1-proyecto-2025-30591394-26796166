import express from 'express'
import ProfesionalesController from '../controllers/ProfesionalesController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 * - name: Profesionales
 * description: Operaciones sobre los profesionales de la salud
 */

/**
 * @openapi
 * /profesionales:
 *   post:
 *     tags:
 *       - Profesionales
 *     summary: Crear un nuevo profesional
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfesionalCreate'
 *     responses:
 *       '201':
 *         description: Profesional creado
 *       '400':
 *         description: Datos inválidos
 *       '409':
 *         description: Conflicto (documento duplicado)
 */
router.post('/', ProfesionalesController.createProfesional)

/**
 * @openapi
 * /profesionales:
 *   get:
 *     tags:
 *       - Profesionales
 *     summary: Obtener todos los profesionales
 *     responses:
 *       '200':
 *         description: Lista de profesionales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesional'
 */
router.get('/', ProfesionalesController.getAllProfesionales)

/**
 * @openapi
 * /profesionales/{id}:
 *   get:
 *     tags:
 *       - Profesionales
 *     summary: Obtener un profesional por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Profesional encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesional'
 *       '404':
 *         description: No encontrado
 */
router.get('/:id', ProfesionalesController.getProfesionalById)

/**
 * @openapi
 * /profesionales/{id}:
 *   patch:
 *     tags:
 *       - Profesionales
 *     summary: Actualizar un profesional (parcial)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfesionalUpdate'
 *     responses:
 *       '200':
 *         description: Profesional actualizado
 *       '400':
 *         description: Datos inválidos
 *       '404':
 *         description: No encontrado
 */
router.patch('/:id', ProfesionalesController.updateProfesional)

/**
 * @openapi
 * /profesionales/{id}:
 *   delete:
 *     tags:
 *       - Profesionales
 *     summary: Eliminar un profesional por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Eliminado correctamente
 *       '404':
 *         description: No encontrado
 */
router.delete('/:id', ProfesionalesController.deleteProfesional)

export default router
