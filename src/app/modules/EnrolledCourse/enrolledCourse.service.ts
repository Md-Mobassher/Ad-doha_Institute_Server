/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import mongoose from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { Faculty } from '../Faculty/faculty.model'
import { Student } from '../Student/student.model'
import { TEnrolledCourse } from './enrolledCourse.interface'
import EnrolledCourse from './enrolledCourse.model'
import { calculateGradeAndPoints } from './enrolledCourse.utils'
import OfferedCourse from '../offeredCourse/offeredCourse.model'
import { ENrolledCourseSearchableFields } from './enrolledCourse.constant'
import { Transaction } from '../Transaction/transaction.model'

const createEnrolledCourseIntoDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !')
  }

  const student = await Student.findOne({ id: userId }, { _id: 1 })

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }
  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse,
    student: student._id,
  })

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const result = await EnrolledCourse.create(
      [
        {
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
        },
      ],
      { session },
    )

    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this cousre !',
      )
    }

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const createEnrolledCourseByAdmin = async (
  payload: Partial<TEnrolledCourse>,
) => {
  const { offeredCourse, transaction } = payload

  const isTransactionExists = await Transaction.findById(transaction)

  if (!isTransactionExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Transaction not found !')
  }

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !')
  }

  const student = await Student.findOne({ _id: payload.student }, { _id: 1 })

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const isTransactionDonotmatch = await Transaction.findOne({
    studentId: payload.student,
    offeredCourse: payload.offeredCourse,
  })
  if (isTransactionDonotmatch) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Transaction does not match with the provided course!',
    )
  }

  const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
    offeredCourse,
    student: student._id,
  })

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'Student is already enrolled !')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    const result = await EnrolledCourse.create(
      [
        {
          transaction: payload.transaction,
          academicDepartment: isOfferedCourseExists.academicDepartment,
          offeredCourse: offeredCourse,
          course: isOfferedCourseExists.course,
          student: student._id,
          faculty: isOfferedCourseExists.faculty,
        },
      ],
      { session },
    )
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to enroll in this cousre !',
      )
    }

    await session.commitTransaction()
    await session.endSession()

    return result
  } catch (err: any) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error(err)
  }
}

const getSingleEnrolledCourse = async (id: string) => {
  const result = await EnrolledCourse.findById(id)
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enrolled course not found!')
  }

  return result
}

const getAllEnrolledCourse = async (query: Record<string, unknown>) => {
  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find()
      .populate('offeredCourse')
      .populate('course')
      .populate('student')
      .populate('faculty'),
    query,
  )
    .search(ENrolledCourseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await enrolledCourseQuery.modelQuery
  const meta = await enrolledCourseQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getMyEnrolledCoursesFromDB = async (
  studentId: string,
  query: Record<string, unknown>,
) => {
  const student = await Student.findOne({ id: studentId })

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const enrolledCourseQuery = new QueryBuilder(
    EnrolledCourse.find({ student: student._id })
      .populate('offeredCourse')
      .populate('course')
      .populate('student')
      .populate('faculty'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await enrolledCourseQuery.modelQuery
  const meta = await enrolledCourseQuery.countTotal()

  return {
    meta,
    result,
  }
}
const updateEnrolledStatus = async (
  id: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const isCourseExist = await EnrolledCourse.findById(id)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Course not found.')
  }
  const result = await EnrolledCourse.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const updateEnrolledCourseMarksIntoDB = async (
  facultyId: string,
  payload: Partial<TEnrolledCourse>,
) => {
  const { offeredCourse, student, courseMarks } = payload

  const isOfferedCourseExists = await OfferedCourse.findById(offeredCourse)

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Offered course not found !')
  }
  const isStudentExists = await Student.findById(student)

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found !')
  }

  const faculty = await Faculty.findOne({ id: facultyId }, { _id: 1 })

  if (!faculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty not found !')
  }

  const isCourseBelongToFaculty = await EnrolledCourse.findOne({
    offeredCourse,
    student,
    faculty: faculty._id,
  })

  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden! !')
  }

  const modifiedData: Record<string, unknown> = {
    ...courseMarks,
  }

  if (courseMarks?.finalTerm) {
    const { classTest1, classTest2, midTerm, finalTerm } =
      isCourseBelongToFaculty.courseMarks

    const totalMarks =
      Math.ceil(classTest1) +
      Math.ceil(midTerm) +
      Math.ceil(classTest2) +
      Math.ceil(finalTerm)

    const result = calculateGradeAndPoints(totalMarks)

    modifiedData.grade = result.grade
    modifiedData.gradePoints = result.gradePoints
    modifiedData.isCompleted = true
  }

  if (courseMarks && Object.keys(courseMarks).length) {
    for (const [key, value] of Object.entries(courseMarks)) {
      modifiedData[`courseMarks.${key}`] = value
    }
  }

  const result = await EnrolledCourse.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true,
    },
  )

  return result
}

const deleteEnrolledCourse = async (id: string) => {
  const isCourseExist = await EnrolledCourse.findById(id)
  if (!isCourseExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'Enrolled-Course not found.')
  }

  await EnrolledCourse.findByIdAndDelete(id)

  return null
}

export const EnrolledCourseServices = {
  createEnrolledCourseIntoDB,
  createEnrolledCourseByAdmin,
  getSingleEnrolledCourse,
  getAllEnrolledCourse,
  getMyEnrolledCoursesFromDB,
  updateEnrolledStatus,
  updateEnrolledCourseMarksIntoDB,
  deleteEnrolledCourse,
}
