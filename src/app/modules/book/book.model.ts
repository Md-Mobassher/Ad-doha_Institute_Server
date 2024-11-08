import { model, Schema } from 'mongoose'
import { TBook } from './book.interface'
import { BookCategory } from '../BookCategory/bookCategory.model'

const bookSchema = new Schema<TBook>({
  title: {
    type: String,
    required: true,
  },
  category: { type: Schema.Types.ObjectId, ref: BookCategory, required: true },
  image: {
    type: String,
    required: true,
    default: '',
  },
  url: {
    type: String,
    required: true,
  },
})

export const Book = model<TBook>('Book', bookSchema)
