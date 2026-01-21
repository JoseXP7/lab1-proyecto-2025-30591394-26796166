import { z } from 'zod'

export const createOrdenItem = z.object({
  codigo: z.string().min(1),
  descripcion: z.string().min(1),
  indicaciones: z.string().optional(),
})

export const updateOrdenItem = createOrdenItem
  .partial()
  .refine((d) => Object.keys(d).length > 0, {
    message: 'Debe enviar al menos un campo',
  })

export default createOrdenItem
