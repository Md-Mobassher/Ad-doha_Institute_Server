import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacultyServices } from './faculty.service'

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacultyServices.getSingleFacultyFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is retrieved succesfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req, res) => {
  const result = await FacultyServices.getAllFacultiesFromDB(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const { password, faculty } = req.body
  const result = await FacultyServices.updateFacultyIntoDB(
    id,
    password,
    faculty,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is updated succesfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacultyServices.deleteFacultyFromDB(id)

  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is deleted succesfully',
      data: null,
    })
  }
})

export const FacultyControllers = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
