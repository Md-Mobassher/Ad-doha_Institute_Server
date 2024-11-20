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
  // Check if the category exists
  const isCategoryExist = await BookCategory.findById(payload.category)
  if (!isCategoryExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Category does not exist!!!')
  }

  // Check if the provided authors exist
  const authorIds = payload.authors || []
  const existingAuthors = await Author.find({ _id: { $in: authorIds } })
  if (existingAuthors.length !== authorIds.length) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Authors do not exist!!!')
  }

  // Create the book
  const newBook = await Book.create(payload)
  if (!newBook) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Book')
  }

  // Update authors with the new book
  await Promise.all(
    existingAuthors.map((author) =>
      Author.findByIdAndUpdate(author._id, {
        $addToSet: { books: newBook._id }, // Ensure no duplicates
      }),
    ),
  )

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
  // Check if the book exists
  const existingBook = await Book.findById(id)
  if (!existingBook) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Book Found')
  }

  // Check and sync authors if the payload includes updated authors
  if (payload.authors) {
    const newAuthorIds = payload.authors || []
    const existingAuthors = await Author.find({ _id: { $in: newAuthorIds } })

    // Validate authors
    if (existingAuthors.length !== newAuthorIds.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Some authors do not exist')
    }

    // Remove this book from previous authors
    if (existingBook.authors && existingBook.authors.length > 0) {
      await Promise.all(
        existingBook.authors.map((authorId) =>
          Author.findByIdAndUpdate(authorId, {
            $pull: { books: id },
          }),
        ),
      )
    }

    // Add this book to the new authors
    await Promise.all(
      newAuthorIds.map((authorId) =>
        Author.findByIdAndUpdate(authorId, {
          $addToSet: { books: id },
        }),
      ),
    )
  }

  // Update the book
  const updatedBook = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })

  return updatedBook
}

const deleteBook = async (id: string) => {
  // Check if the book exists
  const existingBook = await Book.findById(id)
  if (!existingBook) {
    throw new AppError(httpStatus.BAD_REQUEST, 'No Book Found')
  }

  // Remove the book ID from the authors' books list
  if (existingBook.authors && existingBook.authors.length > 0) {
    await Promise.all(
      existingBook.authors.map((authorId) =>
        Author.findByIdAndUpdate(authorId, {
          $pull: { books: id }, // Remove the book reference
        }),
      ),
    )
  }

  // Delete the book
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
