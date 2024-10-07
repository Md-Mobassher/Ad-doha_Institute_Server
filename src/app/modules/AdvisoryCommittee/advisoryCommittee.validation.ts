import { z } from 'zod'

const createAdvisoryCommitteeValidationSchema = z.object({
  name: z.string({ required_error: 'Designation is required' }).trim(),
  designation: z.string({ required_error: 'Designation is required' }),
  image: z.string({ required_error: 'Designation is required' }),
  position: z
    .number()
    .nonnegative({ message: 'Position must be a positive number' }),
})

const updateAdvisoryCommitteeValidationSchema = z.object({
  name: z
    .string({ required_error: 'Designation is required' })
    .trim()
    .optional(),
  designation: z
    .string({ required_error: 'Designation is required' })
    .optional(),
  image: z.string({ required_error: 'Designation is required' }).optional(),
  position: z
    .number()
    .nonnegative({ message: 'Position must be a positive number' })
    .optional(),
})

export const AdvisoryCommitteeValidaton = {
  createAdvisoryCommitteeValidationSchema,
  updateAdvisoryCommitteeValidationSchema,
}
