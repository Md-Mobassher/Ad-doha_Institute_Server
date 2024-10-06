import { Types } from 'mongoose'

export interface ICourse {
  _id?: string
  academicDepartment: Types.ObjectId
  courseName: string
  slug: string
  courseImage: string
  medium: string
  totalClasses: string
  duration: string
  schedule: [string]
  classDuration: string
  fee: {
    total: string
    admission: string
    monthly: string
  }
  contact: string
  courseDescription?: [string]
  objectives?: [string]
  outcomes?: [string]
  targetAudience?: [string]
  modules?: [string]
  topic?: [string]
  link?: string
}
