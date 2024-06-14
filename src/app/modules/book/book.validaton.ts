import { z } from 'zod'

const createBookValidationSchema = z.object({
  title: z.string({ required_error: 'Book title is required.' }),
  image: z.string({ required_error: 'Book image is required.' }),
  url: z.string({ required_error: 'Book url is required' }),
})

const updateBookValidationSchema = z.object({
  title: z.string({ required_error: 'Book title is required.' }).optional(),
  image: z.string({ required_error: 'Book image is required.' }).optional(),
  url: z.string({ required_error: 'Book url is required' }).optional(),
})

export const BookValidaton = {
  createBookValidationSchema,
  updateBookValidationSchema,
}
