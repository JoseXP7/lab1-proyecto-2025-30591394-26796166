import { z } from 'zod'

export const createPrestacion = z.object({
  codigo: z.string().min(1),
  nombre: z.string().min(1),
  grupo: z.string().min(1),
  requisitos: z.string().optional(),
  tiempoEstimado: z.number().int().optional(),
})

export const updatePrestacion = createPrestacion
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Debe enviar al menos un campo',
  })

export default createPrestacion
