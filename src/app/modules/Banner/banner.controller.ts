import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BannerServices } from './banner.service'
import AppError from '../../errors/AppError'

const createBanner = catchAsync(async (req, res) => {
  const result = await BannerServices.createBanner(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bannerd created succesfully!!!',
    data: result,
  })
})

const getAllBanners = catchAsync(async (req, res) => {
  const result = await BannerServices.getAllBanners(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banners are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateBanner = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BannerServices.updateBanner(id, req.body)
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No data found')
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banners is updated succesfully.',
    data: result,
  })
})

const deleteBanner = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BannerServices.deleteBanner(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Banner is deleted succesfully',
    data: result,
  })
})

export const BannerControllers = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
}
