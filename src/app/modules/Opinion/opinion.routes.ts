import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { OpinionValidation } from './opinion.validation'
import { OpinionControllers } from './opinion.controller'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OpinionValidation.createOpinionValidationSchema),
  OpinionControllers.createOpinion,
)

router.get('/', OpinionControllers.getAllOpinion)

router.get('/:id', OpinionControllers.getSingleOpinion)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(OpinionValidation.updateOpinionValidationSchema),
  OpinionControllers.updateOpinion,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  OpinionControllers.deleteOpinion,
)

export const OpinionRoutes = router
