import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { BookCategoryControllers } from './bookCategory.controller'
import { BookCategoryValidaton } from './bookCategory.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(BookCategoryValidaton.createBookCategoryValidationSchema),
  BookCategoryControllers.createBookCategory,
)

router.get('/', BookCategoryControllers.getAllBookCategory)

router.get('/:id', BookCategoryControllers.getSingleBookCategory)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(BookCategoryValidaton.updateBookCategoryValidationSchema),
  BookCategoryControllers.updateBookCategory,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  BookCategoryControllers.deleteBookCategory,
)

export const BookCategoryRoutes = router
