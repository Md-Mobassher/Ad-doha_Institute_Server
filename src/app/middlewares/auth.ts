import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import AppError from '../errors/AppError'
import catchAsync from '../utils/catchAsync'
import { TUserRole } from '../modules/Users/user.interface'
import { User } from '../modules/Users/user.model'

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Authorization token missing or malformed!',
      )
    }

    let decoded: JwtPayload
    try {
      decoded = jwt.verify(
        token,
        config.jwt.access_secret as string,
      ) as JwtPayload
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid or expired token!')
    }

    const { role, userId, iat } = decoded

    if (!role || !userId) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid token!')
    }

    const user = await User.isUserExistsByCustomId(userId)

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User not found!')
    }

    if (user.isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'User is deleted!')
    }

    if (user.status === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'User is blocked!')
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Token issued before password change!',
      )
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'Access denied!')
    }

    req.user = decoded as JwtPayload & { role: string }
    next()
  })
}

export default auth
