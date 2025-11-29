import { z } from 'zod'

export const createConsentimiento = z.object({
  personaId: z.number().int('El ID de la persona debe ser un entero'),
  tipoProcedimiento: z.string().min(1),
  fecha: z.coerce
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), { message: 'Fecha inválida' }),
  contenido: z.string().min(1),
  metodo: z.string().optional(),
  archivoId: z.string().optional(),
})
