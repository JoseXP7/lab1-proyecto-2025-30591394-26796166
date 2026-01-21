import { z } from "zod"

export const createPlan = z.object({
  aseguradoraId: z.number().int(),
  nombre: z.string().min(1),
  condicionesGenerales: z.string().min(1),
})

export const updatePlan = createPlan
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Debe enviar al menos un campo",
  })
