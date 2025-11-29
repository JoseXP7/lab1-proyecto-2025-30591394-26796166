import express from 'express'
import EpisodiosController from '../controllers/EpisodiosController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  - name: Episodios
 *    description: Gestión de episodios de atención
 */

/**
 * @openapi
 * /episodios:
 *   post:
 *     tags: [Episodios]
 *     summary: Crear un episodio de atención
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Episodio'
 *     responses:
 *       201:
 *         description: Episodio creado
 */
router.post('/', EpisodiosController.createEpisodio)

/**
 * @openapi
 * /episodios:
 *   get:
 *     tags: [Episodios]
 *     summary: Obtener todos los episodios
 *     responses:
 *       200:
 *         description: Lista de episodios
 */
router.get('/', EpisodiosController.getAllEpisodios)

/**
 * @openapi
 * /episodios/{id}:
 *   get:
 *     tags: [Episodios]
 *     summary: Obtener episodio por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Episodio encontrado
 */
router.get('/:id', EpisodiosController.getEpisodioById)

/**
 * @openapi
 * /episodios/{id}/notas:
 *   post:
 *     tags: [Episodios]
 *     summary: Registrar una nueva nota clínica dentro de un episodio
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
 *             $ref: '#/components/schemas/NotaClinica'
 *     responses:
 *       201:
 *         description: Nota creada
 */
router.post(
  '/:id/notas',
  (await import('../controllers/NotasClinicasController.js')).default.createNota
)
/**
 * @openapi
 * /episodios/{id}/diagnosticos:
 *   post:
 *     tags: [Episodios]
 *     summary: Asociar uno o más diagnósticos a un episodio
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
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Diagnostico'
 *     responses:
 *       201:
 *         description: Diagnósticos asociados
 */
router.post(
  '/:id/diagnosticos',
  (await import('../controllers/DiagnosticosController.js')).default
    .addDiagnosticos
)

/**
 * @openapi
 * /episodios/{id}:
 *   patch:
 *     tags: [Episodios]
 *     summary: Actualizar un episodio
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
 *             $ref: '#/components/schemas/Episodio'
 *     responses:
 *       200:
 *         description: Episodio actualizado
 */
router.patch('/:id', EpisodiosController.updateEpisodio)

/**
 * @openapi
 * /episodios/{id}:
 *   delete:
 *     tags: [Episodios]
 *     summary: Eliminar un episodio
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Episodio eliminado
 */
router.delete('/:id', EpisodiosController.deleteEpisodio)

export default router
