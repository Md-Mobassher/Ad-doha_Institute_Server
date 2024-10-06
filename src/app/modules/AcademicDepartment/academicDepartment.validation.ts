import { z } from 'zod'

const createAcademicDepartmentValidationSchema = z.object({
  name: z.string({ required_error: 'Academic Department name is required.' }),
  image: z.string({ required_error: 'Academic Department image is required.' }),
  position: z.number({
    required_error: 'Academic Department position is required',
  }),
})

const updateAcademicDepartmentValidationSchema = z.object({
  name: z
    .string({ required_error: 'Academic Department name is required.' })
    .optional(),
  image: z
    .string({ required_error: 'Academic Department image is required.' })
    .optional(),
  position: z
    .number({
      required_error: 'Academic Department position is required',
    })
    .optional(),
})

export const AcademicDepartmentValidaton = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
}
