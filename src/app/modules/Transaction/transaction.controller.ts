import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { TransactionServices } from './transaction.service'
import AppError from '../../errors/AppError'

const createTransaction = catchAsync(async (req, res) => {
  const result = await TransactionServices.createTransaction(req.body)

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction is created succesfully',
    data: result,
  })
})

const getAllTransaction = catchAsync(async (req, res) => {
  const result = await TransactionServices.getAllTransaction(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleTransaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TransactionServices.getSingleTransaction(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction is retrived succesfully.',
    data: result,
  })
})

const updateTransaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TransactionServices.updateTransaction(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction is updated succesfully.',
    data: result,
  })
})

const deleteTransaction = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await TransactionServices.deleteTransaction(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Transaction is deleted succesfully.',
    data: result,
  })
})

export const TransactionControllers = {
  createTransaction,
  getAllTransaction,
  getSingleTransaction,
  updateTransaction,
  deleteTransaction,
}
