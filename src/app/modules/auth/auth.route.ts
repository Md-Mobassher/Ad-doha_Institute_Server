import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { AuthControllers } from './auth.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../Users/user.constant'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)

router.post(
  '/verify-email',
  validateRequest(AuthValidation.verifyEmailValidationSchema),
  AuthControllers.verifyOtp,
)

router.post(
  '/change-password',
  auth(
    USER_ROLE.super_admin,
    USER_ROLE.admin,
    USER_ROLE.student,
    USER_ROLE.faculty,
  ),
  validateRequest(AuthValidation.changePasswordValidationSchema),
  AuthControllers.changePassword,
)

router.post(
  '/refresh-token',
  // validateRequest(AuthValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
)

router.post(
  '/forget-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.forgetPassword,
)

router.post(
  '/reset-password',
  validateRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthControllers.resetPassword,
)

export const AuthRoutes = router
