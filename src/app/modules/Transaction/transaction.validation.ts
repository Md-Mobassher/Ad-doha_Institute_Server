import { z } from 'zod'

const createTransactionValidationSchema = z.object({
  offeredCourse: z.string({ required_error: 'offeredCourse is required' }),
  studentId: z.string({ required_error: 'studentId is required' }),
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
  paymentStatus: z.enum(['PENDING', 'COMPLETED', 'FAILED'], {
    required_error: 'Status Missing',
    invalid_type_error: 'Payment Method must be one of the listed providers',
  }),
})

const updateTransactionValidationSchema = z.object({
  paymentStatus: z
    .enum(['PENDING', 'COMPLETED', 'FAILED'], {
      required_error: 'Status Missing',
      invalid_type_error: 'Payment Method must be one of the listed providers',
    })
    .optional(),
})

export const TransactionValidation = {
  createTransactionValidationSchema,
  updateTransactionValidationSchema,
}
