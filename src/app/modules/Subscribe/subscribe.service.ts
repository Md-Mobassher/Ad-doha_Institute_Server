import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { ISubsCribe } from './subscribe.interface'
import { SubsCribe } from './subscribe.model'

const createSubsCribe = async (payload: ISubsCribe) => {
  const isAlreadySubcribe = await SubsCribe.findOne({ email: payload.email })

  if (isAlreadySubcribe) {
    throw new AppError(httpStatus.CONFLICT, 'You are already Subscribed!!!')
  }

  const result = await SubsCribe.create(payload)
  return result
}

const getAllSubsCribes = async (query: Record<string, unknown>) => {
  const SubsCribeQuery = new QueryBuilder(SubsCribe.find(), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await SubsCribeQuery.modelQuery
  const meta = await SubsCribeQuery.countTotal()
  return {
    meta,
    result,
  }
}

const deleteSubsCribe = async (id: string) => {
  const isSubsCribeExist = await SubsCribe.findById(id)
  if (!isSubsCribeExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This SubsCribe is not found')
  }
  await SubsCribe.findByIdAndDelete(id)
  return null
}

export const SubsCribeServices = {
  createSubsCribe,
  getAllSubsCribes,
  deleteSubsCribe,
}
