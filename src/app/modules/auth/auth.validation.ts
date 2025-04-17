import { z } from 'zod'

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).email(),
  password: z.string({ required_error: 'Password is required' }),
})

const verifyEmailValidationSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({
      message: 'Email must be a valid email address.',
    }),
  otp: z.number({
    required_error: 'OTP is required',
  }),
})

const changePasswordValidationSchema = z.object({
  oldPassword: z.string({
    required_error: 'Old password is required',
  }),
  newPassword: z.string({ required_error: 'Password is required' }),
})

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

const forgetPasswordValidationSchema = z.object({
  email: z
    .string({
      required_error: 'User email is required!',
    })
    .email(),
})

const resetPasswordValidationSchema = z.object({
  email: z
    .string({
      required_error: 'User email is required!',
    })
    .email(),
  newPassword: z.string({
    required_error: 'User password is required!',
  }),
})

export const AuthValidation = {
  loginValidationSchema,
  verifyEmailValidationSchema,
  changePasswordValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
}
