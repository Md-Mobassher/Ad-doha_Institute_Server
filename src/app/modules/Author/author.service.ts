/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TAuthor } from './author.interface'
import { Author } from './author.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { AuthorSearchableFields } from './author.constant'
import { Book } from '../Book/book.model'

const createAuthor = async (payload: TAuthor) => {
  const newAuthor = await Author.create(payload)

  if (!newAuthor) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Author')
  }
  return newAuthor
}

const getAllAuthors = async (query: Record<string, unknown>) => {
  const AuthorQuery = new QueryBuilder(Author.find(), query)
    .search(AuthorSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await AuthorQuery.modelQuery
  const meta = await AuthorQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleAuthor = async (id: string) => {
  const result = await Author.findById(id)
  return result
}

const updateAuthor = async (id: string, payload: Partial<TAuthor>) => {
  const isAuthorExist = await Author.findById(id)
  if (!isAuthorExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Author Found')
  }
  const result = await Author.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteAuthor = async (id: string) => {
  const isAuthorExist = await Author.findById(id)
  if (!isAuthorExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Author Found')
  }

  await Book.updateMany({ authors: id }, { $pull: { authors: id } })

  // Delete the author
  await Author.findByIdAndDelete(id)

  return null
}

export const AuthorServices = {
  createAuthor,
  getAllAuthors,
  getSingleAuthor,
  updateAuthor,
  deleteAuthor,
}
