import express from 'express'
import ArancelController from '../controllers/ArancelController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Arancel
 *     description: Gestión de aranceles
 */

/**
 * @openapi
 * /arancel:
 *   post:
 *     tags: [Arancel]
 *     summary: Crear un arancel
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Arancel'
 *     responses:
 *       201:
 *         description: Arancel creado
 */
router.post('/', ArancelController.createArancel)

/**
 * @openapi
 * /arancel:
 *   get:
 *     tags: [Arancel]
 *     summary: Listar aranceles
 *     responses:
 *       200:
 *         description: Lista de aranceles
 */
router.get('/', ArancelController.listAranceles)

/**
 * @openapi
 * /arancel/{id}:
 *   get:
 *     tags: [Arancel]
 *     summary: Obtener arancel por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Arancel
 */
router.get('/:id', ArancelController.getArancel)

/**
 * @openapi
 * /arancel/{id}:
 *   patch:
 *     tags: [Arancel]
 *     summary: Actualizar arancel
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
 *             $ref: '#/components/schemas/Arancel'
 *     responses:
 *       200:
 *         description: Arancel actualizado
 */
router.patch('/:id', ArancelController.updateArancel)

/**
 * @openapi
 * /arancel/{id}:
 *   delete:
 *     tags: [Arancel]
 *     summary: Eliminar arancel
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
router.delete('/:id', ArancelController.deleteArancel)

export default router
