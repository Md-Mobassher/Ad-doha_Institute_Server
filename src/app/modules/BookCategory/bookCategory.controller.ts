import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookCategoryServices } from './bookCategory.service'
import AppError from '../../errors/AppError'

const createBookCategory = catchAsync(async (req, res) => {
  const result = await BookCategoryServices.createBookCategory(req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Category is created succesfully',
    data: result,
  })
})

const getAllBookCategory = catchAsync(async (req, res) => {
  const result = await BookCategoryServices.getAllBookCategory(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Category are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleBookCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookCategoryServices.getSingleBookCategory(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Category is retrived succesfully.',
    data: result,
  })
})

const updateBookCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookCategoryServices.updateBookCategory(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Category is updated succesfully.',
    data: result,
  })
})

const deleteBookCategory = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookCategoryServices.deleteBookCategory(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book Category is deleted succesfully.',
    data: result,
  })
})

export const BookCategoryControllers = {
  createBookCategory,
  getAllBookCategory,
  getSingleBookCategory,
  updateBookCategory,
  deleteBookCategory,
}
