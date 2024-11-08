import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import { AuthorControllers } from './author.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthorValidaton } from './author.validaton'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(AuthorValidaton.createAuthorValidationSchema),
  AuthorControllers.createAuthor,
)

router.get('/', AuthorControllers.getAllAuthors)

router.get('/:id', AuthorControllers.getSingleAuthor)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  AuthorControllers.updateAuthor,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  AuthorControllers.deleteAuthor,
)

export const AuthorRoutes = router
