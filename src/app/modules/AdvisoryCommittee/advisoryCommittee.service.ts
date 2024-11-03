/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { IAdvisoryCommittee } from './advisoryCommittee.interface'
import { AdvisoryCommittee } from './advisoryCommittee.model'
import { AdvisoryCommitteeSearchableFields } from './advisoryCommittee.constant'

const createAdvisoryCommittee = async (payload: IAdvisoryCommittee) => {
  const newAdvisoryCommittee = await AdvisoryCommittee.create(payload)

  if (!newAdvisoryCommittee) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create Advisory-Committee',
    )
  }
  return newAdvisoryCommittee
}

const getAllAdvisoryCommittee = async (query: Record<string, unknown>) => {
  const AdvisoryCommitteeQuery = new QueryBuilder(
    AdvisoryCommittee.find(),
    query,
  )
    .search(AdvisoryCommitteeSearchableFields)
    .filter()
    .sort('position')
    .paginate()
    .fields()

  const result = await AdvisoryCommitteeQuery.modelQuery
  const meta = await AdvisoryCommitteeQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAdvisoryCommittee = async (id: string) => {
  const result = await AdvisoryCommittee.findById(id)
  return result
}

const updateAdvisoryCommittee = async (
  id: string,
  payload: Partial<IAdvisoryCommittee>,
) => {
  const result = await AdvisoryCommittee.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAdvisoryCommittee = async (id: string) => {
  const isAdvisoryCommitteeExist = await AdvisoryCommittee.findById(id)
  if (!isAdvisoryCommitteeExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Advisory-Committee Found!!!')
  }
  await AdvisoryCommittee.findByIdAndDelete(id)

  return null
}

export const AdvisoryCommitteeServices = {
  createAdvisoryCommittee,
  getAllAdvisoryCommittee,
  getSingleAdvisoryCommittee,
  updateAdvisoryCommittee,
  deleteAdvisoryCommittee,
}
