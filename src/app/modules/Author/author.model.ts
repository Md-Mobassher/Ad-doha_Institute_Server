import { model, Schema, Types } from 'mongoose'
import { TAuthor } from './author.interface'

const AuthorSchema = new Schema<TAuthor>({
  name: { type: String, required: true },
  biography: { type: String },
  birthDate: { type: Date },
  nationality: { type: String },
  website: { type: String },
  socialLinks: {
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    linkedin: { type: String },
  },
  books: [{ type: Types.ObjectId, ref: 'Book' }],
})

export const Author = model<TAuthor>('Author', AuthorSchema)
