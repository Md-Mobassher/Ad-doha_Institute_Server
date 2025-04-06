import { Types } from 'mongoose'

export interface ITransaction {
  _id?: string
  offeredCourse: Types.ObjectId
  studentId: Types.ObjectId
  transactionId: string
  phoneNumber: string
  amount: number
  paymentMethod: 'BKASH' | 'NAGAD' | 'CELLFINE'
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED'
}
