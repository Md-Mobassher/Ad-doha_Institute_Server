import { z } from 'zod'

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  lastName: z.string(),
})

export const createStudentValidationSchema = z.object({
  password: z.string().max(20).nullable().optional(),
  student: z.object({
    name: createUserNameValidationSchema,
    gender: z.preprocess(
      (val) => (val === '' ? null : val),
      z.enum(['male', 'female', 'other']).nullable().optional(),
    ),
    dateOfBirth: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    contactNo: z.string().nullable().optional(),
    emergencyContactNo: z.string().nullable().optional(),
    bloodGroup: z.preprocess(
      (val) => (val === '' ? null : val),
      z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .nullable()
        .optional(),
    ),
    presentAddress: z.string().nullable().optional(),
    permanentAddress: z.string().nullable().optional(),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  lastName: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  password: z.string().max(20).nullable().optional(),
  student: z.object({
    name: updateUserNameValidationSchema.optional(),
    gender: z
      .string()
      .refine(
        (val) => val === '' || ['male', 'female', 'other'].includes(val),
        { message: 'Invalid gender' },
      )
      .nullable()
      .optional(),
    dateOfBirth: z.string().nullable().optional(),
    email: z.string().email().nullable().optional(),
    contactNo: z.string().nullable().optional(),
    emergencyContactNo: z.string().nullable().optional(),
    bloodGroup: z.preprocess(
      (val) => (val === '' ? null : val),
      z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .nullable()
        .optional(),
    ),
    presentAddress: z.string().nullable().optional(),
    permanentAddress: z.string().nullable().optional(),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
