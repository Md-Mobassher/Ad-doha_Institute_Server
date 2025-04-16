import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { IBanner } from './banner.interface'
import { Banner } from './banner.model'

const createBanner = async (payload: IBanner) => {
  const result = await Banner.create(payload)
  return result
}

const getAllBanners = async (query: Record<string, unknown>) => {
  const BannerQuery = new QueryBuilder(Banner.find(), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await BannerQuery.modelQuery
  const meta = await BannerQuery.countTotal()
  return {
    meta,
    result,
  }
}

const updateBanner = async (id: string, payload: Partial<IBanner>) => {
  const result = await Banner.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBanner = async (id: string) => {
  const isBannerExist = await Banner.findById(id)
  if (!isBannerExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This Banner is not found')
  }
  await Banner.findByIdAndDelete(id)
  return null
}

export const BannerServices = {
  createBanner,
  getAllBanners,
  updateBanner,
  deleteBanner,
}
