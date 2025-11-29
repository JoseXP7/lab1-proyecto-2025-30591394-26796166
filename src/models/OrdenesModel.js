import { z } from 'zod'

export const createOrdenes = z.object({
  episodioId: z.number().int('El ID del episodio debe ser entero'),
  fechaCreacion: z.coerce.date().optional(),
  tipo: z.string().min(1),
  prioridad: z.string().optional(),
  estado: z.string().optional(),
})

export const updateOrdenes = createOrdenes
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })

export default createOrdenes
