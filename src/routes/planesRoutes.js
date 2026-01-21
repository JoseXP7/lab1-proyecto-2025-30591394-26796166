import express from 'express'
import PlanesController from '../controllers/PlanesCoberturaController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Planes
 *     description: Operaciones sobre planes de cobertura
 */

/**
 * @openapi
 * /planes:
 *   get:
 *     tags: [Planes]
 *     summary: Listar planes de cobertura
 *     responses:
 *       200:
 *         description: Lista de planes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plan'
 */

/**
 * @openapi
 * /planes:
 *   post:
 *     tags: [Planes]
 *     summary: Crear un plan de cobertura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanCreate'
 *     responses:
 *       201:
 *         description: Plan creado
 */

/**
 * @openapi
 * /planes/{id}:
 *   get:
 *     tags: [Planes]
 *     summary: Obtener un plan por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Plan
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plan'
 */

/**
 * @openapi
 * /planes/{id}:
 *   patch:
 *     tags: [Planes]
 *     summary: Actualizar un plan
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
 *             $ref: '#/components/schemas/PlanUpdate'
 *     responses:
 *       200:
 *         description: Plan actualizado
 */

/**
 * @openapi
 * /planes/{id}:
 *   delete:
 *     tags: [Planes]
 *     summary: Desactivar un plan
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

router.get('/', PlanesController.listPlans)
router.post('/', PlanesController.createPlan)
router.get('/:id', PlanesController.getPlanById)
router.patch('/:id', PlanesController.updatePlan)
router.delete('/:id', PlanesController.deactivatePlan)

export default router
