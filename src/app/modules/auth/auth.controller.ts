import httpStatus from 'http-status'
import config from '../../config'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)
  const { refreshToken, accessToken, needsPasswordChange } = result

  res.cookie('refreshToken', refreshToken, {
    secure: config.node_env === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  })

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Logged in succesfully!',
    data: {
      accessToken,
      refreshToken,
      needsPasswordChange,
    },
  })
})

const verifyOtp = catchAsync(async (req, res) => {
  const result = await AuthServices.verifyOtp(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Email Verified successfully!!!',
    data: result,
  })
})

const changePassword = catchAsync(async (req, res) => {
  const result = await AuthServices.changePassword(req.user, req.body)
  if (result) {
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password is updated succesfully!',
      data: result,
    })
  }
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthServices.refreshToken(refreshToken)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrieved succesfully!',
    data: result,
  })
})

const forgetPassword = catchAsync(async (req, res) => {
  const userEmail = req.body.email
  const result = await AuthServices.forgetPassword(userEmail)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password Reset link Send to your email. Please check!',
    data: result,
  })
})

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization

  if (!token) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Something went wrong !')
  }

  const result = await AuthServices.resetPassword(req.body, token)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password reset succesfully!',
    data: result,
  })
})

export const AuthControllers = {
  loginUser,
  verifyOtp,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
