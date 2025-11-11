import { z } from 'zod'

export const createPersonasAtendidas = z.object({
  tipoDocumento: z.enum(['V', 'E']),
  numeroDocumento: z.string().min(1).max(8),
  nombres: z.string().min(1).max(100),
  apellidos: z.string().min(1).max(100),
  fechaNacimiento: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .transform((str) => new Date(str)), //YYYY-MM-DD
  sexo: z.enum(['M', 'F']),
  correo: z.email(),
  telefono: z.string().min(11).max(15),
  direccion: z.string().min(1).max(200),
  contactoEmergencia: z.string().min(11).max(15),
  alergias: z.string().max(500).optional(),
  estado: z.boolean().default(true),
})

export const updatePersonasAtendidas = createPersonasAtendidas
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'At least one field must be provided for update',
  })
