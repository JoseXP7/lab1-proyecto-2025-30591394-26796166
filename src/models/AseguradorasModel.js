import { z } from 'zod'

export const createAseguradora = z.object({
  nombre: z.string().min(1),
  nit: z.string().min(1),
  contacto: z.string().min(1),
  estado: z.string().optional(),
})

export const updateAseguradora = createAseguradora
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Debe enviar al menos un campo',
  })
