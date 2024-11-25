import { Types } from 'mongoose'

export interface IOfferedCourse {
  _id?: string
  course: Types.ObjectId
  orientation: string
  admissionDeadline: string
  startDate: string
  endDate: string
  status: 'UPCOMING' | 'ONGOING' | 'ENDED'
  isDeleted: boolean
}
