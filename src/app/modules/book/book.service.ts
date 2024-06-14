/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TBook } from './book.interface'
import { Book } from './book.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { BookSearchableFields } from './book.constant'

const createBook = async (payload: TBook) => {
  const newBook = await Book.create(payload)

  if (!newBook) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Book')
  }
  return newBook
}

const getAllBooks = async (query: Record<string, unknown>) => {
  const bookQuery = new QueryBuilder(Book.find(), query)
    .search(BookSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await bookQuery.modelQuery
  const meta = await bookQuery.countTotal()
  return {
    result,
    meta,
  }
}

const getSingleBook = async (id: string) => {
  const result = await Book.findById(id)
  return result
}

const updateBook = async (id: string, payload: Partial<TBook>) => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBook = async (id: string) => {
  const deletedBook = await Book.findByIdAndDelete(id)

  if (!deletedBook) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete book')
  }

  return deletedBook
}

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
