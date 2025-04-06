import { z } from 'zod'

const createEnrolledCourseValidationZodSchema = z.object({
  offeredCourse: z.string(),
  transactionId: z.string({ required_error: 'transactionId is required' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required' }),
  amount: z
    .number()
    .positive({ message: 'amount must be a positive number' })
    .nonnegative(),
  paymentMethod: z.enum(['BKASH', 'NAGAD', 'CELLFINE'], {
    required_error: 'paymentMethod required',
    invalid_type_error: 'Payment Method must be one of the listed providers',
  }),
})
const createEnrolledCourseByAdminValidationZodSchema = z.object({
  transaction: z.string(),
  offeredCourse: z.string(),
  student: z.string(),
})

const updateEnrolledCourseMarksValidationZodSchema = z.object({
  offeredCourse: z.string(),
  student: z.string(),
  courseMarks: z.object({
    classTest1: z.number().optional(),
    midTerm: z.number().optional(),
    classTest2: z.number().optional(),
    finalTerm: z.number().optional(),
  }),
})

export const EnrolledCourseValidations = {
  createEnrolledCourseValidationZodSchema,
  updateEnrolledCourseMarksValidationZodSchema,
  createEnrolledCourseByAdminValidationZodSchema,
}
