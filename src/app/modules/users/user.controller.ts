import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.service'
import AppError from '../../errors/AppError'

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body

  const result = await UserServices.createStudentIntoDB(
    req.file,
    password,
    studentData,
  )

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body

  const result = await UserServices.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body
  const result = await UserServices.createAdminIntoDB(
    req.file,
    password,
    adminData,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  })
})

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user
  const result = await UserServices.getMe(userId, role)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  })
})

const updateMyProfile = catchAsync(async (req, res) => {
  const { userId, role } = req.user
  const result = await UserServices.updateMyProfile(userId, role, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated succesfully',
    data: result,
  })
})

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await UserServices.changeStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  })
})
export const UserControllers = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
  updateMyProfile,
}
