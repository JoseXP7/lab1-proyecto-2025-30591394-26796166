import { z } from 'zod'

export const createAfiliacion = z.object({
  personaId: z.number(),
  planId: z.number(),
  numeroPoliza: z.string().min(1),
  vigenteDesde: z.string().min(1),
  vigenteHasta: z.string().min(1),
  copago: z.number().optional(),
  cuotaModeradora: z.number().optional(),
})

export const updateAfiliacion = createAfiliacion
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Debe enviar al menos un campo',
  })
