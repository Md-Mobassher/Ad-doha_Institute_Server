import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { CourseControllers } from '../course/course.controller'
import { OfferedCourseValidaton } from './offeredCourse.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OfferedCourseValidaton.createOfferedCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/', CourseControllers.getAllCourse)

router.get('/:id', CourseControllers.getSingleCourse)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OfferedCourseValidaton.updateOfferedCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  CourseControllers.deleteCourse,
)

export const CourseRoutes = router
