/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { ITeacher } from './teacher.interface'
import { Teacher } from './teacher.model'
import { TeacherSearchableFields } from './teacher.constant'

const createTeacher = async (payload: ITeacher) => {
  const newTeacher = await Teacher.create(payload)

  if (!newTeacher) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Teacher')
  }
  return newTeacher
}

const getAllTeacher = async (query: Record<string, unknown>) => {
  const teacherQuery = new QueryBuilder(Teacher.find(), query)
    .search(TeacherSearchableFields)
    .filter()
    .sort('position')
    .paginate()
    .fields()

  const result = await teacherQuery.modelQuery
  const meta = await teacherQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleTeacher = async (id: string) => {
  const result = await Teacher.findById(id)
  return result
}

const updateTeacher = async (id: string, payload: Partial<ITeacher>) => {
  const result = await Teacher.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteTeacher = async (id: string) => {
  const isTeacherExist = await Teacher.findById(id)
  if (!isTeacherExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Teacher Found!!!')
  }
  await Teacher.findByIdAndDelete(id)
  return null
}

export const TeacherServices = {
  createTeacher,
  getAllTeacher,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
}
