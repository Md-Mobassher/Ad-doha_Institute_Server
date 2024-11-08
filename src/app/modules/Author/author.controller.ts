import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { AuthorServices } from './author.service'

const createAuthor = catchAsync(async (req, res) => {
  const result = await AuthorServices.createAuthor(req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is created succesfully',
    data: result,
  })
})

const getAllAuthors = catchAsync(async (req, res) => {
  const result = await AuthorServices.getAllAuthors(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Authors are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleAuthor = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AuthorServices.getSingleAuthor(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is retrived succesfully.',
    data: result,
  })
})

const updateAuthor = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AuthorServices.updateAuthor(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is updated succesfully.',
    data: result,
  })
})

const deleteAuthor = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AuthorServices.deleteAuthor(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Author is deleted succesfully.',
    data: result,
  })
})

export const AuthorControllers = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
}
