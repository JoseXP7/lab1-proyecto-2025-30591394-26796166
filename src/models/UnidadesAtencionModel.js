import { z } from 'zod'

export const createUnidadesAtencion = z.object({
  nombre: z
    .string()
    .min(3, 'El nombre de la unidad debe tener al menos 3 caracteres.')
    .max(100, 'El nombre no debe exceder los 100 caracteres.'),
  tipo: z.string().min(1, 'El tipo de unidad es requerido').max(50).optional(),
  direccion: z
    .string()
    .min(5, 'Debe especificar la dirección completa.')
    .max(200, 'La dirección no debe exceder los 200 caracteres.'),

  telefono: z
    .string()
    .min(11, 'El teléfono debe tener al menos 11 dígitos.')
    .max(15, 'El teléfono no debe exceder los 15 dígitos.'),

  horarioReferencia: z
    .string()
    .min(3, 'El horario de referencia es requerido')
    .max(200)
    .optional(),
  // En prisma `estado` es un string por defecto 'ACTIVO'
  estado: z.string().optional(),
})

export const updateUnidadesAtencion = createUnidadesAtencion
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })
