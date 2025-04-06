import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { OfferedCourseValidaton } from './offeredCourse.validation'
import { OfferedCourseControllers } from './offeredCourse.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OfferedCourseValidaton.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
)

router.get('/', OfferedCourseControllers.getAllOfferedCourse)

router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OfferedCourseValidaton.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  OfferedCourseControllers.deleteOfferedCourse,
)

export const OfferedCourseRoutes = router
