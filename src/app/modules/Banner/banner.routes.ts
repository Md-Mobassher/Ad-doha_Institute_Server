import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { createBannerValidationschema } from './banner.validation'
import { BannerControllers } from './banner.controller'
import { USER_ROLE } from '../Users/user.constant'

const router = express.Router()

router.post(
  '/',
  validateRequest(createBannerValidationschema),
  BannerControllers.createBanner,
)

router.get('/', BannerControllers.getAllBanners)

router.patch(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  BannerControllers.updateBanner,
)

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  BannerControllers.deleteBanner,
)

export const BannerRoutes = router
