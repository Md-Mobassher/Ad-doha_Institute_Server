/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AdminSearchableFields } from './admin.constant'
import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'
import { User } from '../Users/user.model'
import bcrypt from 'bcrypt'
import config from '../../config'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().populate('user'), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  const meta = await adminQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}

const updateAdminIntoDB = async (
  id: string,
  password: string | null | undefined,
  payload: Partial<TAdmin>,
) => {
  const { name, email, ...remainingAdminData } = payload
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const existingAdmin = await Admin.findById(id)
    if (!existingAdmin) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admin not found')
    }

    if (existingAdmin.email !== email) {
      const existingUserByEmail = await User.findOne({ email: email })
      if (existingUserByEmail) {
        throw new AppError(httpStatus.CONFLICT, 'Email already exists')
      }

      const existingUser = await User.findById(existingAdmin.user)
      if (!existingUser) {
        throw new AppError(httpStatus.NOT_FOUND, 'No User found!!!')
      }

      await User.findByIdAndUpdate(
        existingUser._id,
        { email: email },
        { new: true, runvalidator: true, session },
      )
    }

    const modifiedUpdatedData: Record<string, unknown> = {
      email: email,
      ...remainingAdminData,
    }

    if (name && Object.keys(name).length) {
      for (const [key, value] of Object.entries(name)) {
        modifiedUpdatedData[`name.${key}`] = value
      }
    }

    if (password) {
      //hash new password
      const newHashedPassword = await bcrypt.hash(
        password,
        Number(config.bcrypt_salt_rounds),
      )
      await User.findOneAndUpdate(
        {
          email: payload.email,
        },
        {
          password: newHashedPassword,
          needsPasswordChange: false,
          passwordChangedAt: new Date(),
        },
      )
    }

    const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
      new: true,
      runValidators: true,
      session,
    })

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedAdmin
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
}
