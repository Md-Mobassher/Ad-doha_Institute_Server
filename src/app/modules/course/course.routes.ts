import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { CourseControllers } from './course.controller'
import { CourseValidaton } from './course.validation'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(CourseValidaton.createCourseValidationSchema),
  CourseControllers.createCourse,
)

router.get('/', CourseControllers.getAllCourse)

router.get('/:id', CourseControllers.getSingleCourse)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(CourseValidaton.updateCourseValidationSchema),
  CourseControllers.updateCourse,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  CourseControllers.deleteCourse,
)

export const CourseRoutes = router
