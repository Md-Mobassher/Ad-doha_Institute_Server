import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { TeacherValidaton } from './teacher.validation'
import { TeacherControllers } from './teacher.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(TeacherValidaton.createTeacherValidationSchema),
  TeacherControllers.createTeacher,
)

router.get('/', TeacherControllers.getAllTeacher)

router.get('/:id', TeacherControllers.getSingleTeacher)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(TeacherValidaton.updateTeacherValidationSchema),
  TeacherControllers.updateTeacher,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  TeacherControllers.deleteTeacher,
)

export const TeacherRoutes = router
