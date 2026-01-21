import { z } from 'zod'

export const createAfiliacion = z.object({
  personaId: z.number(),
  planId: z.number(),
  numeroPoliza: z.string().min(1),
  vigenteDesde: z.preprocess(
    (val) => {
      if (typeof val === 'string') return new Date(val)
      return val
    },
    z
      .date()
      .refine((d) => !Number.isNaN(d.getTime()), {
        message: 'vigenteDesde debe ser una fecha válida (ISO-8601)',
      }),
  ),
  vigenteHasta: z.preprocess(
    (val) => {
      if (typeof val === 'string') return new Date(val)
      return val
    },
    z
      .date()
      .refine((d) => !Number.isNaN(d.getTime()), {
        message: 'vigenteHasta debe ser una fecha válida (ISO-8601)',
      }),
  ),
  copago: z.number().optional(),
  cuotaModeradora: z.number().optional(),
})

export const updateAfiliacion = createAfiliacion
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Debe enviar al menos un campo',
  })
