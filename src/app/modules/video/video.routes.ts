import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { VideoControllers } from './video.controller'
import { VideoValidaton } from './video.validaton'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(VideoValidaton.createVideoValidationSchema),
  VideoControllers.createVideo,
)

router.get('/', VideoControllers.getAllVideos)

router.get('/:id', VideoControllers.getSingleVideo)

router.patch(
  '/update/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(VideoValidaton.updateVideoValidationSchema),
  VideoControllers.updateVideo,
)

router.delete(
  '/delete/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  VideoControllers.deleteVideo,
)

export const VideoRoutes = router
