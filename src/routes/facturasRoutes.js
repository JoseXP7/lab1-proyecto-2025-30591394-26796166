import express from 'express'
import facturasController from '../controllers/FacturasController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *   - name: Facturas
 *     description: Facturación y cobros
 */

/**
 * @openapi
 * /facturas:
 *   post:
 *     tags: [Facturas]
 *     summary: Crear factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FacturaCreate'
 *     responses:
 *       201:
 *         description: Factura creada
 */
router.post('/', facturasController.create)

/**
 * @openapi
 * /facturas/{id}:
 *   get:
 *     tags: [Facturas]
 *     summary: Obtener factura por id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Factura encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Factura'
 */
router.get('/:id', facturasController.get)

/**
 * @openapi
 * /facturas/{id}/pagos:
 *   post:
 *     tags: [Facturas]
 *     summary: Registrar pago para factura
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
 *             $ref: '#/components/schemas/PagoCreate'
 *     responses:
 *       201:
 *         description: Pago registrado
 */
router.post('/:id/pagos', facturasController.createPago)

export default router
