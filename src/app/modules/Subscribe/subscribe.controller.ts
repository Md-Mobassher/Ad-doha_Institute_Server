import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { SubsCribeServices } from './subscribe.service'

const createSubsCribe = catchAsync(async (req, res) => {
  const result = await SubsCribeServices.createSubsCribe(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscribed succesfully!!!',
    data: result,
  })
})

const getAllSubsCribes = catchAsync(async (req, res) => {
  const result = await SubsCribeServices.getAllSubsCribes(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscribes are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const deleteSubsCribe = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await SubsCribeServices.deleteSubsCribe(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Subscribe is deleted succesfully',
    data: result,
  })
})

export const SubsCribeControllers = {
  createSubsCribe,
  getAllSubsCribes,
  deleteSubsCribe,
}
