import { Schema, model } from 'mongoose'
import { IBookCategory } from './bookCategory.interface'

const BookCategorySchema: Schema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

export const BookCategory = model<IBookCategory>(
  'BookCategory',
  BookCategorySchema,
)
