import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { VideoServices } from './video.service'

const createVideo = catchAsync(async (req, res) => {
  const result = await VideoServices.createVideo(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video is created succesfully',
    data: result,
  })
})

const getAllVideos = catchAsync(async (req, res) => {
  const result = await VideoServices.getAllVideos(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Videos are retrived succesfully.',
    data: result.result,
    meta: result.meta,
  })
})

const getSingleVideo = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await VideoServices.getSingleVideo(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video is retrived succesfully.',
    data: result,
  })
})

const updateVideo = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await VideoServices.updateVideo(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video is updated succesfully.',
    data: result,
  })
})

const deleteVideo = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await VideoServices.deleteVideo(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video is deleted succesfully.',
    data: result,
  })
})

export const VideoControllers = {
  createVideo,
  getAllVideos,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
