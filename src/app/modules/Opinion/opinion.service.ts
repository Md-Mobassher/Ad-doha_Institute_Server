/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { IAcademicDepartment } from './opinion.interface'
import { AcademicDepartment } from './opinion.model'
import { AcademicDepartmentSearchableFields } from './opinion.constant'

const createAcademicDepartment = async (payload: IAcademicDepartment) => {
  const newAcademicDepartment = await AcademicDepartment.create(payload)

  if (!newAcademicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to create AcademicDepartment',
    )
  }
  return newAcademicDepartment
}

const getAllAcademicDepartment = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(AcademicDepartment.find(), query)
    .search(AcademicDepartmentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await departmentQuery.modelQuery
  const meta = await departmentQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id)
  return result
}

const updateAcademicDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAcademicDepartment = async (id: string) => {
  const deletedDepartment = await AcademicDepartment.findByIdAndDelete(id)

  if (!deletedDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Failed to delete Academic Department',
    )
  }

  return null
}

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteAcademicDepartment,
}
