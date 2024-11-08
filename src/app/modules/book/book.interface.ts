import { Types } from 'mongoose'

export interface TBook {
  title: string
  category: Types.ObjectId
  authors?: Types.ObjectId[]
  image: string
  url: string
  publishedDate?: Date
  publisher?: string
  description?: string
  price: number
  stock?: number
  language?: string
  rating?: number
  reviews?: { userId: Types.ObjectId; comment: string; rating: number }[]
  pageCount: number
  format: 'Paperback' | 'Hardcover' | 'Ebook'
}
