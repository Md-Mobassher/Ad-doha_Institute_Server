/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { AdminSearchableFields } from './admin.constant'
import { TAdmin } from './admin.interface'
import { Admin } from './admin.model'
import { User } from '../users/user.model'

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find(), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await adminQuery.modelQuery
  const meta = await adminQuery.countTotal()
  return {
    meta,
    result,
  }
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id)
  return result
}

const updateAdminIntoDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingAdminData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  const result = await Admin.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAdminFromDB = async (id: string | undefined) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const isAdminExists = await Admin.findById(id).session(session)

    if (id !== isAdminExists?._id) {
      throw new AppError(httpStatus.NOT_FOUND, 'Admin not found')
    }

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin')
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.user

    const deletedUser = await User.findOneAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User')
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
