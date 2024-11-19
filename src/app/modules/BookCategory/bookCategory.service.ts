/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { IBookCategory } from './bookCategory.interface'
import { BookCategory } from './bookCategory.model'
import { BookCategorySearchableFields } from './bookCategory.constant'

const createBookCategory = async (payload: IBookCategory) => {
  const newBookCategory = await BookCategory.create(payload)

  if (!newBookCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create BookCategory')
  }
  return newBookCategory
}

const getAllBookCategory = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(BookCategory.find(), query)
    .search(BookCategorySearchableFields)
    .filter()
    .sort('position')
    .paginate(50)
    .fields()

  const result = await departmentQuery.modelQuery
  const meta = await departmentQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleBookCategory = async (id: string) => {
  const result = await BookCategory.findById(id)
  return result
}

const updateBookCategory = async (
  id: string,
  payload: Partial<IBookCategory>,
) => {
  const result = await BookCategory.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBookCategory = async (id: string) => {
  const isDepartmentExist = await BookCategory.findById(id)
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Department Found')
  }
  await BookCategory.findByIdAndDelete(id)

  return null
}

export const BookCategoryServices = {
  createBookCategory,
  getAllBookCategory,
  getSingleBookCategory,
  updateBookCategory,
  deleteBookCategory,
}
