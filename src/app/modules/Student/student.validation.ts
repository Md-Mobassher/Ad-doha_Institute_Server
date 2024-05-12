import { z } from 'zod'

const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
})

export const createStudentValidationSchema = z.object({
  password: z.string().max(20).optional(),
  student: z.object({
    name: createUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    academicDepartment: z.string(),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  student: z.object({
    name: updateUserNameValidationSchema,
    gender: z.enum(['male', 'female', 'other']).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().email().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    bloodGroup: z
      .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
      .optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
})

export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
}
