import { z } from 'zod'

export const createPrescripciones = z.object({
  episodioId: z.number().int('El ID del episodio debe ser entero'),
  fechaPrescripcion: z.coerce.date().optional(),
  observaciones: z.string().optional(),
  estado: z.string().optional(),
})

export const updatePrescripciones = createPrescripciones
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })

export default createPrescripciones
