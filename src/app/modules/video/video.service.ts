/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { TVideo } from './video.interface'
import { VideoSearchableFields } from './video.constant'
import { Video } from './video.model'

const createVideo = async (payload: TVideo) => {
  const newVideo = await Video.create(payload)

  if (!newVideo) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Video')
  }
  return newVideo
}

const getAllVideos = async (query: Record<string, unknown>) => {
  const VideoQuery = new QueryBuilder(Video.find(), query)
    .search(VideoSearchableFields)
    .filter()
    .sort('position')
    .paginate()
    .fields()

  const result = await VideoQuery.modelQuery
  const meta = await VideoQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleVideo = async (id: string) => {
  const result = await Video.findById(id)
  return result
}

const updateVideo = async (id: string, payload: Partial<TVideo>) => {
  const result = await Video.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteVideo = async (id: string) => {
  const isVideoExist = await Video.findById(id)
  if (!isVideoExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Video Found')
  }
  await Video.findByIdAndDelete(id)

  return null
}

export const VideoServices = {
  createVideo,
  getAllVideos,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
