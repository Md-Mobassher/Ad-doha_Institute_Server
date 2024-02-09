/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { IUser } from './user.interface'
import { User } from './user.model'
import mongoose from 'mongoose'
import config from '../../config'
import { Admin } from '../admin/admin.model'
import { USER_ROLE } from './user.constant'

const createAdminIntoDB = async (password: string, payload: any) => {
  // create a user object
  const userData: Partial<IUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set user role
  userData.role = 'admin'

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    //set  generated id
    // userData.id = await generateAdminId()

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    // payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a admin (transaction-2)
    const newAdmin = await Admin.create([payload], { session })

    if (!newAdmin.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }

    await session.commitTransaction()
    await session.endSession()

    return newAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getMe = async (userEmail: string, role: string) => {
  let result = null
  if (role === USER_ROLE.user) {
    result = await User.findOne({ email: userEmail }).populate('user')
  }
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ email: userEmail }).populate('user')
  }
  if (role === USER_ROLE.superAdmin) {
    result = await User.findOne({ email: userEmail }).populate('user')
  }

  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

export const UserServices = {
  createAdminIntoDB,
  getMe,
  changeStatus,
}
