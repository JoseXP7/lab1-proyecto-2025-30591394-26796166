import { z } from 'zod'

export const createResultados = z.object({
  ordenId: z.number().int('El ID de la orden debe ser entero'),
  fecha: z.coerce.date().optional(),
  resumen: z.string().min(1).max(2000),
  archivoId: z.string().optional(),
})

export const updateResultados = createResultados
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })

export default createResultados
