import { Types } from 'mongoose'

export interface ICourse {
  _id?: string
  academicDepartment: Types.ObjectId
  courseName: string
  slug: string
  medium: string
  totalClasses: string
  courseDuration: string
  schedule: [string]
  classDuration: string
  fee: {
    total: string
    admission: string
    monthly: string
  }
  feePaymentMethod: string
  contact: string
  courseDescription?: string
  courseImage: string
}
