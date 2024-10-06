/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { ICourse } from './course.interface'
import { courseSearchableFields } from './course.constant'
import Course from './course.model'
import { AcademicDepartment } from '../AcademicDepartment/academicDepartment.model'

const createCourse = async (payload: ICourse) => {
  const isDepartmentExist = await AcademicDepartment.findById(
    payload?.academicDepartment,
  )
  if (!isDepartmentExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic Department not found.')
  }

  const newCourse = await Course.create(payload)

  if (!newCourse) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Course')
  }
  return newCourse
}

const getAllCourse = async (query: Record<string, unknown>) => {
  const departmentQuery = new QueryBuilder(Course.find(), query)
    .search(courseSearchableFields)
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

const getSingleCourse = async (id: string) => {
  const result = await Course.findById(id)
  return result
}

const updateCourse = async (id: string, payload: Partial<ICourse>) => {
  const result = await Course.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteCourse = async (id: string) => {
  const deletedDepartment = await Course.findByIdAndDelete(id)

  if (!deletedDepartment) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Course')
  }

  return null
}

export const CourseServices = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
}
