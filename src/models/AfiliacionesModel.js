import { z } from "zod"

export const createAfiliacion = z.object({
  personaId: z.number().int("personaId debe ser un entero"),
  planId: z.number().int("planId debe ser un entero"),
  numeroPoliza: z.string().min(1),
  vigenteDesde: z.coerce
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), {
      message: "vigenteDesde inválido",
    }),
  vigenteHasta: z.coerce
    .date()
    .refine((d) => !Number.isNaN(d.getTime()), {
      message: "vigenteHasta inválido",
    }),
  copago: z.number().min(0).optional(),
  cuotaModeradora: z.number().min(0).optional(),
})

export const updateAfiliacion = createAfiliacion
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo para actualizar",
  })
