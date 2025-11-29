import express from 'express'
import AgendaController from '../controllers/AgendaController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 * - name: Agenda
 *   description: Gestión de disponibilidad / bloques de agenda
 */

/**
 * @openapi
 * /agenda:
 *   get:
 *     tags:
 *       - Agenda
 *     summary: Obtener bloques de agenda filtrando por profesional, unidad y rango
 *     parameters:
 *       - in: query
 *         name: profesionalId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: unidadId
 *         schema:
 *           type: integer
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: fin
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       '200':
 *         description: Lista de bloques
 */
router.get('/', AgendaController.getAgenda)

/**
 * @openapi
 * /agenda:
 *   post:
 *     tags:
 *       - Agenda
 *     summary: Crear un bloque de agenda
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Agenda'
 *     responses:
 *       '201':
 *         description: Bloque creado
 */
router.post('/', AgendaController.createAgenda)

/**
 * @openapi
 * /agenda/{id}:
 *   patch:
 *     tags:
 *       - Agenda
 *     summary: Actualizar el estado de un bloque de agenda
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
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Actualizado
 */
router.patch('/:id', AgendaController.patchAgendaEstado)

export default router
