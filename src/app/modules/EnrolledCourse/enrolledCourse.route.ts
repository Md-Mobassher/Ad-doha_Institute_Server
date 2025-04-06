import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'

import { EnrolledCourseControllers } from './enrolledCourse.controller'
import { EnrolledCourseValidations } from './enrolledCourse.validaton'
import { USER_ROLE } from '../Users/user.constant'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.student),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
)
router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseByAdminValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourseByAdmin,
)

router.get(
  '/my-enrolled-courses',
  auth(USER_ROLE.student),
  EnrolledCourseControllers.getMyEnrolledCourses,
)

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  EnrolledCourseControllers.getAllEnrolledCourse,
)
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  EnrolledCourseControllers.getSingleEnrolledCourse,
)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  EnrolledCourseControllers.updateEnrolledStatus,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  EnrolledCourseControllers.deleteEnrolledCourse,
)
router.patch(
  '/update-marks',
  auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
)

export const EnrolledCourseRoutes = router
