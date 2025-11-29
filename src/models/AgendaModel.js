import { z } from 'zod'

export const createAgenda = z.object({
  profesionalId: z.number().int('El ID del profesional debe ser un entero'),
  unidadId: z.number().int('El ID de la unidad debe ser un entero'),
  inicio: z.coerce.date().refine((d) => !Number.isNaN(d.getTime()), {
    message: 'Formato de fecha inválido para "inicio"',
  }),
  fin: z.coerce.date().refine((d) => !Number.isNaN(d.getTime()), {
    message: 'Formato de fecha inválido para "fin"',
  }),
  capacidad: z.number().int().min(1).optional(),
  estado: z.string().optional(),
})

export const updateAgenda = createAgenda
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Al menos un campo debe ser provisto para actualizar',
  })

export const patchAgendaEstado = z.object({
  estado: z.string().min(1),
})
