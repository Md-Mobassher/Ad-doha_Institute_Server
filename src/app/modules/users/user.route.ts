/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { createFacultyValidationSchema } from '../Faculty/faculty.validation'
import { createStudentValidationSchema } from '../Student/student.validation'
import { USER_ROLE } from './user.constant'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'
import { createAdminValidationSchema } from '../Admin/admin.validation'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
)

router.post(
  '/create-faculty',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
)

router.post(
  '/create-admin',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/change-status/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.get(
  '/me',
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student,
  ),
  UserControllers.getMe,
)

router.patch(
  '/update-my-profile',
  auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
  UserControllers.updateMyProfile,
)

export const UserRoutes = router
