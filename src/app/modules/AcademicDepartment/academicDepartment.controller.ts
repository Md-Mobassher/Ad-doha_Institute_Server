import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AcademicDepartmentServices } from './academicDepartment.service'
import AppError from '../../errors/AppError'

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartment(
    req.body,
  )

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is created succesfully',
    data: result,
  })
})

const getAllAcademicDepartment = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartment(
    req.query,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartment(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is retrived succesfully.',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicDepartmentServices.updateAcademicDepartment(
    id,
    req.body,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is updated succesfully.',
    data: result,
  })
})

const deleteAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicDepartmentServices.deleteAcademicDepartment(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department is deleted succesfully.',
    data: result,
  })
})

export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
