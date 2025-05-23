import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import { BookControllers } from './book.controller'
import validateRequest from '../../middlewares/validateRequest'
import { BookValidaton } from './book.validaton'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(BookValidaton.createBookValidationSchema),
  BookControllers.createBook,
)

router.get('/', BookControllers.getAllBooks)

router.get('/:id', BookControllers.getSingleBook)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  BookControllers.updateBook,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  BookControllers.deleteBook,
)

export const BookRoutes = router
