import { z } from 'zod'

const FacturaItemSchema = z.object({
  prestacionCodigo: z.string().min(1),
  descripcion: z.string().min(1),
  cantidad: z.number().int().min(1),
  valorUnitario: z.number(),
  impuestos: z.number(),
  total: z.number().optional(),
})

export const FacturaCreateSchema = z.object({
  numero: z.string().min(1),
  fechaEmision: z.preprocess(
    (v) => (typeof v === 'string' ? new Date(v) : v),
    z.date(),
  ),
  personaId: z.number().int().optional(),
  aseguradoraId: z.number().int().optional(),
  moneda: z.string().min(1),
  items: z.array(FacturaItemSchema).min(1),
  subtotal: z.number().optional(),
  total: z.number().optional(),
  estado: z.string().optional(),
})

export const PagoCreateSchema = z.object({
  fecha: z
    .preprocess((v) => (typeof v === 'string' ? new Date(v) : v), z.date())
    .optional(),
  monto: z.number(),
  medio: z.string().min(1),
  referencia: z.string().optional(),
})

export default FacturaCreateSchema
