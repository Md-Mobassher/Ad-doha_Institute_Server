import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { TeacherServices } from './teacher.service'

const createTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.createTeacher(req.body)

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher is created succesfully',
    data: result,
  })
})

const getAllTeacher = catchAsync(async (req, res) => {
  const result = await TeacherServices.getAllTeacher(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleTeacher = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TeacherServices.getSingleTeacher(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher is retrived succesfully.',
    data: result,
  })
})

const updateTeacher = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TeacherServices.updateTeacher(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher is updated succesfully.',
    data: result,
  })
})

const deleteTeacher = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TeacherServices.deleteTeacher(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher is deleted succesfully.',
    data: result,
  })
})

export const TeacherControllers = {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
}
