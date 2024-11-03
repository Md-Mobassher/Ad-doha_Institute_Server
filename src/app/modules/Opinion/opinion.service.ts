/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { OpinionSearchableFields } from './opinion.constant'
import { IOpinion } from './opinion.interface'
import { Opinion } from './opinion.model'

const createOpinion = async (payload: IOpinion) => {
  const newOpinion = await Opinion.create(payload)

  if (!newOpinion) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Opinion')
  }
  return newOpinion
}

const getAllOpinion = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(Opinion.find(), query)
    .search(OpinionSearchableFields)
    .filter()
    .sort('position')
    .paginate()
    .fields()

  const result = await departmentQuery.modelQuery
  const meta = await departmentQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleOpinion = async (id: string) => {
  const result = await Opinion.findById(id)
  return result
}

const updateOpinion = async (id: string, payload: Partial<IOpinion>) => {
  const result = await Opinion.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteOpinion = async (id: string) => {
  const isOpinionExist = await Opinion.findById(id)
  if (!isOpinionExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Opinion Found!!!')
  }
  await Opinion.findByIdAndDelete(id)

  return null
}

export const OpinionServices = {
  createOpinion,
  getAllOpinion,
  getSingleOpinion,
  updateOpinion,
  deleteOpinion,
}
