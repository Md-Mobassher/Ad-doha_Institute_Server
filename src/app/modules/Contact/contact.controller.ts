import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { ContactServices } from './contact.service'

const createContact = catchAsync(async (req, res) => {
  const result = await ContactServices.createContact(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact is created succesfully',
    data: result,
  })
})

const getAllContacts = catchAsync(async (req, res) => {
  const result = await ContactServices.getAllContacts(req.query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contacts are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  })
})

const deleteContact = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await ContactServices.deleteContact(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Contact is deleted succesfully',
    data: result,
  })
})

export const ContactControllers = {
  createContact,
  getAllContacts,
  deleteContact,
}
