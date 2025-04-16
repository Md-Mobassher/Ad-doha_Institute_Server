import { z } from 'zod'

export const createBannerValidationschema = z.object({
  title: z.string().optional(),
  subTitle: z.string().optional(),
  image: z.string(),
  position: z
    .number()
    .nonnegative({ message: 'Position must be a positive number' }),
})
