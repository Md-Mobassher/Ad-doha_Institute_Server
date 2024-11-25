import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { OfferedCourseServices } from './offeredCourse.service'

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.createOfferedCourse(req.body)

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse is created succesfully',
    data: result,
  })
})

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseServices.getAllOfferedCourse(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.getSingleOfferedCourse(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse is retrived succesfully.',
    data: result,
  })
})

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.updateOfferedCourse(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse is updated succesfully.',
    data: result,
  })
})

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OfferedCourseServices.deleteOfferedCourse(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'OfferedCourse is deleted succesfully.',
    data: result,
  })
})

export const OfferedCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
