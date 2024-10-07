import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import AppError from '../../errors/AppError'
import { AdvisoryCommitteeServices } from './advisoryCommittee.service'

const createAdvisoryCommittee = catchAsync(async (req, res) => {
  const result = await AdvisoryCommitteeServices.createAdvisoryCommittee(
    req.body,
  )

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Advisory-Committee is created succesfully',
    data: result,
  })
})

const getAllAdvisoryCommittee = catchAsync(async (req, res) => {
  const result = await AdvisoryCommitteeServices.getAllAdvisoryCommittee(
    req.query,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Advisory-Committee are retrived succesfully.',
    meta: result.meta,
    data: result.result,
  })
})

const getSingleAdvisoryCommittee = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdvisoryCommitteeServices.getSingleAdvisoryCommittee(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Advisory-Committee is retrived succesfully.',
    data: result,
  })
})

const updateAdvisoryCommittee = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdvisoryCommitteeServices.updateAdvisoryCommittee(
    id,
    req.body,
  )
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Advisory-Committee is updated succesfully.',
    data: result,
  })
})

const deleteAdvisoryCommittee = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdvisoryCommitteeServices.deleteAdvisoryCommittee(id)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AdvisoryCommittee is deleted succesfully.',
    data: result,
  })
})

export const AdvisoryCommitteeControllers = {
  createAdvisoryCommittee,
  getAllAdvisoryCommittee,
  getSingleAdvisoryCommittee,
  updateAdvisoryCommittee,
  deleteAdvisoryCommittee,
}
