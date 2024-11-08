/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { TBook } from './book.interface'
import { Book } from './book.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { BookSearchableFields } from './book.constant'
import { BookCategory } from '../BookCategory/bookCategory.model'
import { Author } from '../Author/author.model'

const createBook = async (payload: TBook) => {
  const isCategoryExist = await BookCategory.findById(payload.category)
  if (!isCategoryExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category does not exist!!!')
  }
  const authorIds = payload.authors || []
  const existingAuthors = await Author.find({ _id: { $in: authorIds } })
  if (existingAuthors.length !== authorIds.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Authors do not exist!!!')
  }

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
  const isBookExist = await Book.findById(id)
  if (!isBookExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Book Found')
  }
  const result = await Book.findById(id)
  return result
}

const updateBook = async (id: string, payload: Partial<TBook>) => {
  const isBookExist = await Book.findById(id)
  if (!isBookExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Book Found')
  }
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

const deleteBook = async (id: string) => {
  const isBookExist = await Book.findById(id)
  if (!isBookExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Book Found')
  }
  await Book.findByIdAndDelete(id)

  return null
}

export const BookServices = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
}
