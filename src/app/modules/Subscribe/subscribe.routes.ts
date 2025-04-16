import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { createSubsCribeValidationschema } from './subscribe.validation'
import { SubsCribeControllers } from './subscribe.controller'
import { USER_ROLE } from '../Users/user.constant'

const router = express.Router()

router.post(
  '/',
  validateRequest(createSubsCribeValidationschema),
  SubsCribeControllers.createSubsCribe,
)

router.get(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  SubsCribeControllers.getAllSubsCribes,
)

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  SubsCribeControllers.deleteSubsCribe,
)

export const SubsCribeRoutes = router
