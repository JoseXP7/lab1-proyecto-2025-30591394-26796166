import { z } from 'zod'

export const createNota = z.object({
  profesionalId: z.number().int('El ID del profesional debe ser un entero'),
  fechaNota: z.coerce.date().refine((d) => !Number.isNaN(d.getTime()), {
    message: 'Formato inválido para fechaNota',
  }),
  subjetivo: z.string().optional(),
  objetivo: z.string().optional(),
  analisis: z.string().optional(),
  plan: z.string().optional(),
  adjuntos: z.any().optional(),
})
