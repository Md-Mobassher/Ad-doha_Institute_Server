import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import { TLoginUser } from './auth.interface'
import { createToken, verifyToken } from './auth.utils'
import { User } from '../Users/user.model'
import { sendEmail } from '../../utils/sendEmail'
import { TUser } from '../Users/user.interface'

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email)
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status
  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  if (userStatus === 'pending') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Please verify your email before login! !',
    )
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')
  }

  //create token and sent to the  client
  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt.refresh_secret as string,
    config.jwt.refresh_expires_in as string,
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user?.needsPasswordChange,
  }
}

const verifyOtp = async (payload: Partial<TUser>) => {
  const { email, otp } = payload

  // Validate input
  if (!email || !otp || typeof otp !== 'number') {
    throw new AppError(httpStatus.BAD_REQUEST, 'Invalid email or OTP provided')
  }

  // Fetch required user fields
  const user = await User.findOne({
    email: email,
  })

  if (!user || !user.otp || !user.otpExpiredAT) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found or no OTP found')
  }

  // Check OTP validity and expiration
  if (user.otp !== otp || new Date() > user.otpExpiredAT) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired OTP')
  }

  // Activate user and clear OTP fields
  await User.updateMany({
    email, // Ensure valid OTP
    data: {
      emailVerifiedAt: new Date(),
      otp: null,
      otpExpiredAT: null,
      status: 'in-progress',
      // Fetch ACTIVE status dynamically
    },
  })
}
const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userData.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }

  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  if (userStatus === 'pending') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Please verify your email before login! !',
    )
  }

  //checking if the password is correct
  if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched')

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )

  const result = await User.findOneAndUpdate(
    {
      email: userData.email,
      role: userData.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  )
  return result
}

const refreshToken = async (token: string) => {
  // checking if the given token is valid

  const decoded = verifyToken(token, config.jwt.refresh_secret as string)
  const { email, iat } = decoded

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !')
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    config.jwt.access_expires_in as string,
  )

  return {
    accessToken,
  }
}

const forgetPassword = async (userEmail: string) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(userEmail)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  if (userStatus === 'pending') {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'Please verify your email before login! !',
    )
  }

  const jwtPayload = {
    userId: user.id,
    email: user.email,
    role: user.role,
  }
  const resetToken = createToken(
    jwtPayload,
    config.jwt.access_secret as string,
    '5m',
  )

  const resetLink: string =
    `${
      config.node_env === 'production'
        ? config.frontend.url
        : config.frontend.local_url
    }` + `/reset-password?email=${user.email}&token=${resetToken}`
  const subject = 'Reset Your Password'

  console.log(resetLink)

  await sendEmail(
    user.email,
    subject,
    `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Your Password</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f7;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 20px auto;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        color: #333333;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #dddddd;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        color: #007bff;
      }
      .content {
        padding: 20px;
      }
      .content p {
        margin: 0 0 20px;
        line-height: 1.5;
      }
      .button-container {
        text-align: center;
        margin-top: 20px;
      }
      .button {
        padding: 10px 20px;
        color: #ffffff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
      }
      .button:hover {
        background-color: #0056b3;
      }
      .footer {
        margin-top: 20px;
        text-align: center;
        font-size: 14px;
        color: #666666;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Dear <strong>${user.role}</strong>,</p>
        <p>We received a request to reset your password. Click the button below to reset your password:</p>
        <div class="button-container">
          <a href="${resetLink}" class="button">Reset Password</a>
        </div>
        <p>If you did not request this password reset, please ignore this email. The link will expire in <strong>30 minutes</strong>.</p>
      </div>
      <div class="footer">
        <p>Thank you,</p>
        <p>The [Your Company Name] Team</p>
        <p><a href="mailto:support@yourcompany.com">Contact Support</a></p>
      </div>
    </div>
  </body>
  </html>
  `,
  )

  return resetLink
}

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email)

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !')
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !')
  }

  // checking if the user is blocked
  const userStatus = user?.status

  if (userStatus === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !')
  }
  if (userStatus === 'pending') {
    throw new AppError(httpStatus.FORBIDDEN, 'Please verify your email first!')
  }
  const decoded = jwt.verify(
    token,
    config.jwt.access_secret as string,
  ) as JwtPayload

  if (payload.email !== decoded.email) {
    // console.log(payload.email, decoded.email)
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden!')
  }

  //hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  )
  // console.log(newHashedPassword)
  const result = await User.findOneAndUpdate(
    {
      email: decoded.email,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
  )
  return result
}

export const AuthServices = {
  loginUser,
  verifyOtp,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
}
