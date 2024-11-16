import { model, Schema, Types } from 'mongoose'
import { TAuthor } from './author.interface'

const AuthorSchema = new Schema<TAuthor>({
  name: { type: String, required: true },
  image: { type: String, default: '' },
  biography: { type: String, default: '' },
  birthDate: { type: Date, default: '' },
  nationality: { type: String, default: 'Bangladeshi' },
  website: { type: String, default: '' },
  socialLinks: {
    twitter: { type: String, default: '' },
    facebook: { type: String, default: '' },
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
  },
  books: [{ type: Types.ObjectId, ref: 'Book', default: [] }],
})

export const Author = model<TAuthor>('Author', AuthorSchema)
