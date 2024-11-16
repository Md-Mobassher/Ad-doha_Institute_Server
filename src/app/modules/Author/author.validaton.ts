import { Types } from 'mongoose'
import { z } from 'zod'

export const socialLinksSchema = z.object({
  twitter: z.string().url().optional(),
  facebook: z.string().url().optional(),
  instagram: z.string().url().optional(),
  linkedin: z.string().url().optional(),
})

const createAuthorValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image: z.string().optional(),
  biography: z.string().optional(),
  birthDate: z.string().optional(),
  nationality: z.string().optional(),
  website: z.string().url().optional(),
  socialLinks: socialLinksSchema.optional(),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

const updateAuthorValidationSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  image: z.string().optional(),
  biography: z.string().optional(),
  birthDate: z.string().optional(),
  nationality: z.string().optional(),
  website: z.string().url().optional(),
  socialLinks: socialLinksSchema.optional(),
  books: z.array(z.instanceof(Types.ObjectId)).optional(),
})

export const AuthorValidaton = {
  createAuthorValidationSchema,
  updateAuthorValidationSchema,
}
