import { model, Schema } from 'mongoose'
import { TBook } from './book.interface'

const bookSchema = new Schema<TBook>({
  title: { type: String, required: true },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'BookCategory',
    required: true,
  },
  authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
  image: { type: String, required: true },
  url: { type: String, required: true },
  publishedDate: { type: Date },
  publisher: { type: String },
  description: { type: String },
  price: { type: Number, required: true, default: 0 },
  stock: { type: Number, default: 0 },
  language: { type: String, default: 'bn' },
  rating: { type: Number, min: 0, max: 5 },
  reviews: [
    {
      userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      comment: { type: String, required: true },
      rating: { type: Number, min: 1, max: 5, required: true },
    },
  ],
  pageCount: { type: Number, required: true },
  format: {
    type: String,
    enum: ['Paperback', 'Hardcover', 'Ebook'],
    required: true,
    default: 'Ebook',
  },
})

export const Book = model<TBook>('Book', bookSchema)
