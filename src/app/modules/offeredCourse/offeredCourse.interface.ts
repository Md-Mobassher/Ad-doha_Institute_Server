import { Types } from 'mongoose'

export interface IOfferedCourse {
  _id?: string
  academicDepartment: Types.ObjectId
  course: Types.ObjectId
  faculty: Types.ObjectId
  batch: string
  orientation: string
  admissionDeadline: string
  startDate: string
  endDate: string
  status: 'UPCOMING' | 'ONGOING' | 'ENDED'
  isDeleted: boolean
}
