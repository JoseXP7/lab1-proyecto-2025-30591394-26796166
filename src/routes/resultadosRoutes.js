import express from 'express'
import ResultadosController from '../controllers/ResultadosController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Resultados
 *     description: Gestión de resultados de órdenes
 */

/**
 * @openapi
 * /resultados:
 *   post:
 *     tags: [Resultados]
 *     summary: Crear un resultado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resultado'
 *     responses:
 *       201:
 *         description: Resultado creado
 */
router.post('/', ResultadosController.createResultado)

/**
 * @openapi
 * /resultados:
 *   get:
 *     tags: [Resultados]
 *     summary: Listar resultados
 *     responses:
 *       200:
 *         description: Lista de resultados
 */
router.get('/', ResultadosController.getAllResultados)

/**
 * @openapi
 * /resultados/{id}:
 *   get:
 *     tags: [Resultados]
 *     summary: Obtener resultado por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Resultado
 */
router.get('/:id', ResultadosController.getResultadoById)

/**
 * @openapi
 * /resultados/{id}:
 *   patch:
 *     tags: [Resultados]
 *     summary: Actualizar resultado
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
 *             $ref: '#/components/schemas/Resultado'
 *     responses:
 *       200:
 *         description: Resultado actualizado
 */
router.patch('/:id', ResultadosController.updateResultado)

/**
 * @openapi
 * /resultados/{id}:
 *   delete:
 *     tags: [Resultados]
 *     summary: Eliminar resultado
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
router.delete('/:id', ResultadosController.deleteResultado)

export default router
