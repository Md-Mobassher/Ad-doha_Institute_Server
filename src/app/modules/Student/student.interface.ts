import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  lastName: string
}

export type TStudent = {
  _id?: Types.ObjectId
  id: string
  user: Types.ObjectId
  name: TUserName
  email: string
  gender?: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  contactNo?: string
  emergencyContactNo?: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress?: string
  permanentAddress?: string
  profileImg?: string
  isDeleted: boolean
}

//for creating static
export interface StudentModel extends Model<TStudent> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
}
