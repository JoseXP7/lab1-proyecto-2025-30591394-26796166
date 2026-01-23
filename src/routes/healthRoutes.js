import { Router } from "express"
import prisma from "../config/prisma.js"

const router = Router()

/**
 * @openapi
 * tags:
 *  - name: Healthcheck
 *    description: Verifies API and DB connectivity and returns uptime
 */

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Healthcheck
 *     description: Verifies API and DB connectivity and returns uptime.
 *     responses:
 *       200:
 *         description: API healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 db:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *       503:
 *         description: API unhealthy or DB not reachable
 */
router.get("/", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`
    res.json({
      status: "ok",
      db: "ok",
      uptime: process.uptime(),
      timestamp: new Date(),
    })
  } catch (err) {
    res
      .status(503)
      .json({ status: "unhealthy", db: "error", error: String(err) })
  }
})

export default router
