import { Types } from 'mongoose'

export interface TAuthor {
  _id: Types.ObjectId
  name: string
  biography?: string
  birthDate?: Date
  nationality?: string
  website?: string
  socialLinks?: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  books?: Types.ObjectId[]
}
