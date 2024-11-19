import { Types } from 'mongoose'
import { string, z } from 'zod'

const reviewSchema = z.object({
  userId: z.string(),
  comment: z.string().min(1, 'Comment is required'),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
})

const createBookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string(),
  authors: z.array(string()).optional(),
  image: z.string().optional(),
  url: z.string().url('Invalid URL format for book URL'),
  publishedDate: z.string().optional(),
  publisher: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0').default(0),
  stock: z.number().min(0).optional(),
  language: z.string().optional(),
  pageCount: z.number().min(1, 'Page count must be at least 1'),
  format: z.enum(['Paperback', 'Hardcover', 'Ebook']).default('Ebook'),
})

const updateBookValidationSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  category: z
    .instanceof(Types.ObjectId)
    .refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId',
    })
    .optional(),
  authors: z
    .array(
      z
        .instanceof(Types.ObjectId)
        .refine((val) => Types.ObjectId.isValid(val), {
          message: 'Invalid ObjectId',
        }),
    )
    .optional(),
  image: z.string().url('Invalid URL format for image').optional(),
  url: z.string().url('Invalid URL format for book URL').optional(),
  publishedDate: z.date().optional(),
  publisher: z.string().optional(),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be at least 0').default(0).optional(),
  stock: z.number().min(0).optional(),
  language: z.string().default('bn').optional(),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.array(reviewSchema).optional(),
  pageCount: z.number().min(1, 'Page count must be at least 1').optional(),
  format: z
    .enum(['Paperback', 'Hardcover', 'Ebook'])
    .default('Ebook')
    .optional(),
})

export const BookValidaton = {
  createBookValidationSchema,
  updateBookValidationSchema,
}
