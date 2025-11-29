import { z } from 'zod'

export const createEpisodios = z.object({
  personaId: z.number().int('El ID de la persona debe ser un entero'),
  fechaApertura: z.coerce.date().refine((d) => !Number.isNaN(d.getTime()), {
    message: 'Formato de fecha inválido para "fechaApertura"',
  }),
  motivo: z.string().min(1).max(500),
  tipo: z.string().min(1).max(100),
  estado: z.string().optional(),
})

export const updateEpisodios = createEpisodios
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })

export default createEpisodios
