import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookServices } from './book.service'

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBook(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is created succesfully',
    data: result,
  })
})

const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooks(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleBook = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookServices.getSingleBook(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is retrived succesfully.',
    data: result,
  })
})

const updateBook = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookServices.updateBook(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is updated succesfully.',
    data: result,
  })
})

const deleteBook = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BookServices.deleteBook(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book is deleted succesfully.',
    data: result,
  })
})

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
