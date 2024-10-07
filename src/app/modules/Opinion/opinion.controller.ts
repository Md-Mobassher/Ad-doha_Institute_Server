import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { OpinionServices } from './opinion.service'
import AppError from '../../errors/AppError'

const createOpinion = catchAsync(async (req, res) => {
  const result = await OpinionServices.createOpinion(req.body)

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Opinion is created succesfully',
    data: result,
  })
})

const getAllOpinion = catchAsync(async (req, res) => {
  const result = await OpinionServices.getAllOpinion(req.query)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Opinion are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleOpinion = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OpinionServices.getSingleOpinion(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Opinion is retrived succesfully.',
    data: result,
  })
})

const updateOpinion = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OpinionServices.updateOpinion(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Opinion is updated succesfully.',
    data: result,
  })
})

const deleteOpinion = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OpinionServices.deleteOpinion(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Opinion is deleted succesfully.',
    data: result,
  })
})

export const OpinionControllers = {
  createOpinion,
  getAllOpinion,
  getSingleOpinion,
  updateOpinion,
  deleteOpinion,
}
