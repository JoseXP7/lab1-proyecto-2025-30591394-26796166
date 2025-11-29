import express from 'express'
import ConsentimientosController from '../controllers/ConsentimientosController.js'

const router = express.Router()

/**
 * @openapi
 * tags:
 *  - name: Consentimientos
 *    description: Registro de consentimientos informados
 */

/**
 * @openapi
 * /consentimientos:
 *   post:
 *     tags: [Consentimientos]
 *     summary: Registrar un consentimiento informado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Consentimiento'
 *     responses:
 *       201:
 *         description: Consentimiento registrado
 */
router.post('/', ConsentimientosController.createConsentimiento)

export default router
