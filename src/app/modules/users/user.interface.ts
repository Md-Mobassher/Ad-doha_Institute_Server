/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export interface IUser {
  id: string
  password: string
  needsPasswordChange: boolean
  role: 'admin' | 'user'
  status: 'in-progress' | 'blocked'
  isDeleted: boolean
}

export interface UserModel extends Model<IUser> {
  isUserExists(id: string): Promise<IUser | null>
}
