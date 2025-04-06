import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { EnrolledCourseServices } from './enrolledCourse.service'

const createEnrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId
  const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(
    userId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is enrolled succesfully',
    data: result,
  })
})

const createEnrolledCourseByAdmin = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.createEnrolledCourseByAdmin(
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled created succesfully',
    data: result,
  })
})

const getSingleEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await EnrolledCourseServices.getSingleEnrolledCourse(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled course is retrivied succesfully',
    data: result,
  })
})
const getAllEnrolledCourse = catchAsync(async (req, res) => {
  const result = await EnrolledCourseServices.getAllEnrolledCourse(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrivied succesfully',
    meta: result.meta,
    data: result.result,
  })
})
const getMyEnrolledCourses = catchAsync(async (req, res) => {
  const studentId = req.user.userId

  const result = await EnrolledCourseServices.getMyEnrolledCoursesFromDB(
    studentId,
    req.query,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses are retrivied succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateEnrolledStatus = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await EnrolledCourseServices.updateEnrolledStatus(id, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Enrolled courses is updated succesfully',
    data: result,
  })
})

const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
  const facultyId = req.user.userId
  const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
    facultyId,
    req.body,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Marks is updated succesfully',
    data: result,
  })
})

const deleteEnrolledCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await EnrolledCourseServices.deleteEnrolledCourse(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted succesfully.',
    data: result,
  })
})

export const EnrolledCourseControllers = {
  createEnrolledCourse,
  createEnrolledCourseByAdmin,
  getAllEnrolledCourse,
  getSingleEnrolledCourse,
  getMyEnrolledCourses,
  updateEnrolledStatus,
  deleteEnrolledCourse,
  updateEnrolledCourseMarks,
}
