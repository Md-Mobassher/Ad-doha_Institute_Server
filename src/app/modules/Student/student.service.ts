import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { studentSearchableFields } from './student.constant'
import { TStudent } from './student.interface'
import { Student } from './student.model'
import { User } from '../Users/user.model'
import bcrypt from 'bcrypt'
import config from '../../config'

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Student.find().populate('user'), query)
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await studentQuery.countTotal()
  const result = await studentQuery.modelQuery

  return {
    meta,
    result,
  }
}

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findById(id)

  return result
}

const updateStudentIntoDB = async (
  id: string,
  password: string | null | undefined,
  payload: Partial<TStudent>,
) => {
  const { name, ...remainingStudentData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
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

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.user

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    )

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction()
    await session.endSession()

    return deletedStudent
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error('Failed to delete student')
  }
}

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
}
