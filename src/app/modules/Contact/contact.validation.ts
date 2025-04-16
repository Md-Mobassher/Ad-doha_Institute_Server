import { z } from 'zod'

export const createContactValidationschema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  product: z.string().optional(),
  subject: z.string(),
  message: z.string(),
})
