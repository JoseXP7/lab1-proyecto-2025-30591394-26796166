import { z } from 'zod'

export const createArancel = z.object({
  prestacionCodigo: z.string().min(1),
  planId: z.number().int().optional(),
  valorBase: z.number(),
  impuestos: z.number(),
  vigenteDesde: z.preprocess(
    (v) => (typeof v === 'string' ? new Date(v) : v),
    z.date(),
  ),
  vigenteHasta: z.preprocess(
    (v) => (typeof v === 'string' ? new Date(v) : v),
    z.date(),
  ),
})

export const updateArancel = createArancel
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Debe enviar al menos un campo',
  })

export default createArancel
