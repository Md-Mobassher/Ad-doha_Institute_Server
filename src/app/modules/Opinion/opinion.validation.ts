import { z } from 'zod'

const createOpinionValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim(),
  image: z.string({ required_error: 'Image URL is required' }),
  designation: z.string({ required_error: 'Designation is required' }),
  opinion: z.string({ required_error: 'Opinion is required' }),
  position: z
    .number()
    .nonnegative({ message: 'Position must be a positive number' }),
})

const updateOpinionValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required' }).trim().optional(),
  image: z.string({ required_error: 'Image URL is required' }).optional(),
  designation: z
    .string({ required_error: 'Designation is required' })
    .optional(),
  opinion: z.string({ required_error: 'Opinion is required' }).optional(),
  position: z
    .number()
    .nonnegative({ message: 'Position must be a positive number' })
    .optional(),
})

export const OpinionValidation = {
  createOpinionValidationSchema,
  updateOpinionValidationSchema,
}
