import { model, Schema } from 'mongoose'
import { TBook } from './book.interface'

const bookSchema = new Schema<TBook>({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
})

export const Book = model<TBook>('Book', bookSchema)
