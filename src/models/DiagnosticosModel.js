import { z } from 'zod'

export const createDiagnosticos = z.array(
  z.object({
    codigo: z.string(),
    descripcion: z.string(),
    tipo: z.string().optional(),
    principal: z.boolean().optional(),
  })
)
