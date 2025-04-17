/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import config from '../../config'
import AppError from '../../errors/AppError'
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary'
import { TFaculty } from '../Faculty/faculty.interface'
import { Faculty } from '../Faculty/faculty.model'
import { TUser } from './user.interface'
import { User } from './user.model'
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils'
import { TStudent } from '../Student/student.interface'
import { Student } from '../Student/student.model'
import { TAdmin } from '../Admin/admin.interface'
import { Admin } from '../Admin/admin.model'
import { USER_ROLE } from './user.constant'
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model'
import { sendEmail } from '../../utils/sendEmail'
import bcrypt from 'bcrypt'
import QueryBuilder from '../../builder/QueryBuilder'

const createStudentIntoDB = async (
  file: any,
  password: string,
  payload: TStudent,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student'
  // set student email
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateStudentId()
    const otp = Math.floor(100000 + Math.random() * 900000)
    const hashedOtp = await bcrypt.hash(String(otp), 10)
    const otpExpiredAt = new Date(Date.now() + 15 * 60 * 1000)
    userData.otp = hashedOtp
    userData.otpExpiredAT = otpExpiredAt

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`
      const path = file?.path

      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // create a student (transaction-2)
    const newStudent = await Student.create([payload], { session })

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    // Email verification link with OTP
    const verfiryLink: string = `${
      config.node_env === 'production'
        ? config.frontend.live_url
        : config.frontend.local_url
    }/verify?email=${payload.email}&otp=${otp}`

    // Email content
    const subject = 'Verify Your Email'
    await sendEmail(
      payload.email,
      subject,
      `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
      <h2 style="color: #4CAF50;">Email Verification</h2>
      <p>Dear ${payload.name.firstName} ${payload.name.lastName},</p>
      <p>Thank you for registering with us. Please use the OTP below to verify your email:</p>
      <h3 style="color: #4CAF50;">${otp}</h3>
      <p>Or click the button below to verify directly:</p>
      <a href="${verfiryLink}" style="text-decoration: none; margin-top: 20px;">
        <button style="background-color: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;">Verify Email</button>
      </a>
      <p>If you did not create an account, please ignore this email.</p>
      <p>Best regards,</p>
      <p>The Seeds Team</p>
    </div>
    `,
    )
    await session.commitTransaction()
    await session.endSession()

    return newStudent
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createFacultyIntoDB = async (
  file: any,
  password: string,
  payload: TFaculty,
) => {
  // create a user

  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set faculty role
  userData.role = 'faculty'
  //set faculty email
  userData.email = payload.email

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateFacultyId()

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session }) // array

    //create a faculty
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    // set id , _id as user
    payload.id = newUser[0].id
    payload.user = newUser[0]._id //reference _id

    // check department
    const isAcademicDepartmentExists = await AcademicDepartment.findById(
      payload.academicDepartment,
    )

    if (!isAcademicDepartmentExists) {
      throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found.')
    }

    // // check faculty
    // const isAcademicFacultyExists = await AcademicFaculty.findById(payload.academicFaculty)

    // if (!isAcademicFacultyExists) {
    //   throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found.')
    // }

    // create a faculty (transaction-2)

    const newFaculty = await Faculty.create([payload], { session })

    if (!newFaculty.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    await session.commitTransaction()
    await session.endSession()

    return newFaculty
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createAdminIntoDB = async (
  file: any,
  password: string,
  payload: TAdmin,
) => {
  // create a user object
  const userData: Partial<TUser> = {}

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string)

  //set role
  userData.role = 'admin'
  //set admin email
  userData.email = payload.email
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    //set  generated id
    userData.id = await generateAdminId()

    if (file) {
      const imageName = `${userData.id}${payload?.name?.firstName}`
      const path = file?.path
      //send image to cloudinary
      const { secure_url } = await sendImageToCloudinary(imageName, path)
      payload.profileImg = secure_url as string
    }

    // create a user (transaction-1)
    const newUser = await User.create([userData], { session })

    //create a admin
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin')
    }
    // set id , _id as user
    payload.id = newUser[0].id
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

const getMe = async (userId: string, role: string) => {
  if (!role || !userId) {
    throw new AppError(httpStatus.FORBIDDEN, 'Invalid signature')
  }
  let result = null
  if (role === USER_ROLE.super_admin) {
    result = await User.findOne({ id: userId })
  }
  if (role === USER_ROLE.admin) {
    result = await Admin.findOne({ id: userId }).populate('user')
  }
  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOne({ id: userId }).populate('user')
  }

  if (role === USER_ROLE.student) {
    result = await Student.findOne({ id: userId }).populate('user')
  }

  return result
}

const getAllUsers = async (query: Record<string, unknown>) => {
  const usersQuery = new QueryBuilder(User.find(), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const meta = await usersQuery.countTotal()
  const result = await usersQuery.modelQuery

  return {
    meta,
    result,
  }
}

const updateMyProfile = async (
  userId: string,
  role: string,
  payload: TAdmin | TFaculty | TStudent,
) => {
  const user = await User.isUserExistsByCustomId(userId)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found!')
  }

  const { name, ...remainingData } = payload

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingData,
  }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value
    }
  }

  let result = null

  if (role === USER_ROLE.admin) {
    result = await Admin.findOneAndUpdate(
      { id: userId },
      { $set: modifiedUpdatedData },
      {
        new: true,
        runValidators: true,
      },
    )
  }

  if (role === USER_ROLE.faculty) {
    result = await Faculty.findOneAndUpdate(
      { id: userId },
      { $set: modifiedUpdatedData },
      {
        new: true,
        runValidators: true,
      },
    )
  }

  if (role === USER_ROLE.student) {
    result = await Student.findOneAndUpdate(
      { id: userId },
      { $set: modifiedUpdatedData },
      {
        new: true,
        runValidators: true,
      },
    )
  }

  return result
}

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  })
  return result
}

const deleteUser = async (userId: string) => {
  const user = await User.findById(userId)

  if (!user) {
    throw new Error('User not found')
  }

  // Delete related data based on role
  if (user.role === 'student') {
    await Student.findOneAndDelete({ userId: user._id })
  } else if (user.role === 'faculty') {
    await Faculty.findOneAndDelete({ userId: user._id })
  } else if (user.role === 'admin') {
    await Admin.findOneAndDelete({ userId: user._id })
  }

  // Finally, delete the user
  await User.findByIdAndDelete(userId)

  return { message: 'User and related data deleted successfully' }
}

export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB,
  getMe,
  getAllUsers,
  changeStatus,
  updateMyProfile,
  deleteUser,
}
