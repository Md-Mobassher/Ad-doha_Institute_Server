import { z } from 'zod'

const createBookCategoryValidationSchema = z.object({
  categoryName: z.string({
    required_error: 'Book Category name is required.',
  }),
})

const updateBookCategoryValidationSchema = z.object({
  categoryName: z
    .string({ required_error: 'Book Category name is required.' })
    .optional(),
})

export const BookCategoryValidaton = {
  createBookCategoryValidationSchema,
  updateBookCategoryValidationSchema,
}
