import { z } from 'zod'

export const createSubsCribeValidationschema = z.object({
  email: z.string().email(),
})
