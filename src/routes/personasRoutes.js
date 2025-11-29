import express from 'express'
import PersonasAtentidasController from '../controllers/PersonasAtentidasController.js'
import EpisodiosController from '../controllers/EpisodiosController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Personas
 *     description: Operaciones sobre personas atendidas
 */

/**
 * @openapi
 * /personas:
 *   get:
 *     tags: [Personas]
 *     summary: Obtener todas las personas atendidas
 *     responses:
 *       200:
 *         description: Lista de personas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Persona'
 */
router.get('/', PersonasAtentidasController.getAllPersonasAtendidas)

/**
 * @openapi
 * /personas/{id}:
 *   get:
 *     tags: [Personas]
 *     summary: Obtener una persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Persona encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       404:
 *         description: No encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', PersonasAtentidasController.getPersonaAtendidaById)

/**
 * @openapi
 * /personas/{id}/episodios:
 *   get:
 *     tags: [Personas]
 *     summary: Listar todos los episodios de una persona
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de episodios
 */
router.get('/:id/episodios', EpisodiosController.getEpisodiosByPersona)

/**
 * @openapi
 * /personas:
 *   post:
 *     tags: [Personas]
 *     summary: Crear una nueva persona atendida
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonaCreate'
 *     responses:
 *       201:
 *         description: Persona creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       409:
 *         description: Conflicto (documento duplicado)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', PersonasAtentidasController.createPersonaAtendida)

/**
 * @openapi
 * /personas/{id}:
 *   patch:
 *     tags: [Personas]
 *     summary: Actualizar una persona (parcial)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonaUpdate'
 *     responses:
 *       200:
 *         description: Persona actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Persona'
 *       400:
 *         description: Datos inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: No encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.patch('/:id', PersonasAtentidasController.updatePersonaAtendida)

/**
 * @openapi
 * /personas/{id}:
 *   delete:
 *     tags: [Personas]
 *     summary: Eliminar una persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Eliminado correctamente
 *       404:
 *         description: No encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', PersonasAtentidasController.deletePersonaAtendida)

export default router
