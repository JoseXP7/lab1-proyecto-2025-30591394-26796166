import express from 'express'
import OrdenesController from '../controllers/OrdenesController.js'
import OrdenItemsController from '../controllers/OrdenItemsController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  - name: Ordenes
 *    description: Gestión de órdenes y prestaciones
 */

/**
 * @openapi
 * /ordenes:
 *   post:
 *     tags: [Ordenes]
 *     summary: Crear una orden
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrdenCreate'
 *     responses:
 *       201:
 *         description: Orden creada
 */

/**
 * @openapi
 * /ordenes:
 *   get:
 *     tags: [Ordenes]
 *     summary: Listar órdenes
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
/**
 * @openapi
 * /ordenes/{id}:
 *   get:
 *     tags: [Ordenes]
 *     summary: Obtener una orden por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Orden encontrada
 */
/**
 * @openapi
 * /ordenes/{id}:
 *   patch:
 *     tags: [Ordenes]
 *     summary: Actualizar una orden
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
 *             $ref: '#/components/schemas/OrdenCreate'
 *     responses:
 *       200:
 *         description: Orden actualizada
 */
/**
 * @openapi
 * /ordenes/{id}:
 *   delete:
 *     tags: [Ordenes]
 *     summary: Eliminar una orden
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

router.post('/', OrdenesController.createOrden)
router.get('/', OrdenesController.getAllOrdenes)
router.get('/:id', OrdenesController.getOrdenById)
router.patch('/:id', OrdenesController.updateOrden)
router.delete('/:id', OrdenesController.deleteOrden)

/**
 * @openapi
 * /ordenes/{id}/items:
 *   get:
 *     tags: [Ordenes]
 *     summary: Listar items de una orden
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OrdenItem'
 */
router.get('/:id/items', OrdenItemsController.listItems)

/**
 * @openapi
 * /ordenes/{id}/items:
 *   post:
 *     tags: [Ordenes]
 *     summary: Crear un item en la orden
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
 *             $ref: '#/components/schemas/OrdenItemCreate'
 *     responses:
 *       201:
 *         description: Item creado
 */
router.post('/:id/items', OrdenItemsController.createItem)

export default router
