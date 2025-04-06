/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { IOfferedCourse } from './offeredCourse.interface'
import OfferedCourse from './offeredCourse.model'
import Course from '../course/course.model'
import { OfferedCourseSearchableFields } from './offeredCourse.constant'

const createOfferedCourse = async (payload: IOfferedCourse) => {
  const isCourseExist = await Course.findById(payload?.course)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found.')
  }

  const newOfferedCourse = await OfferedCourse.create(payload)

  if (!newOfferedCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create OfferedCourse')
  }
  return newOfferedCourse
}

const getAllOfferedCourse = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(
    OfferedCourse.find().populate('course'),
    query,
  )
    .search(OfferedCourseSearchableFields)
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

const getSingleOfferedCourse = async (id: string) => {
  const result = await OfferedCourse.findById(id).populate('course')
  return result
}

const updateOfferedCourse = async (
  id: string,
  payload: Partial<IOfferedCourse>,
) => {
  const isCourseExist = await OfferedCourse.findById(id)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered Course not found.')
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteOfferedCourse = async (id: string) => {
  const isOfferedCourseExist = await OfferedCourse.findById(id)
  if (!isOfferedCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'OfferedCourse not found.')
  }

  await OfferedCourse.findByIdAndDelete(id)

  return null
}

export const OfferedCourseServices = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
