import httpStatus from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import AppError from '../../errors/AppError'
import { IContact } from './contact.interface'
import { Contact } from './contact.model'

const createContact = async (payload: IContact) => {
  const result = await Contact.create(payload)
  return result
}

const getAllContacts = async (query: Record<string, unknown>) => {
  const contactQuery = new QueryBuilder(Contact.find(), query)
    .search(['name'])
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await contactQuery.modelQuery
  const meta = await contactQuery.countTotal()
  return {
    meta,
    result,
  }
}

const deleteContact = async (id: string) => {
  const isContactExist = await Contact.findById(id)
  if (!isContactExist) {
    throw new AppError(httpStatus.NOT_FOUND, 'This contact is not found')
  }
  await Contact.findByIdAndDelete(id)
  return null
}

export const ContactServices = {
  createContact,
  getAllContacts,
  deleteContact,
}
