import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { AdvisoryCommitteeControllers } from './advisoryCommittee.controller'
import { AdvisoryCommitteeValidaton } from './advisoryCommittee.validation'

const router = express.Router()

router.post(
  '/create',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(
    AdvisoryCommitteeValidaton.createAdvisoryCommitteeValidationSchema,
  ),
  AdvisoryCommitteeControllers.createAdvisoryCommittee,
)

router.get('/', AdvisoryCommitteeControllers.getAllAdvisoryCommittee)

router.get('/:id', AdvisoryCommitteeControllers.getSingleAdvisoryCommittee)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(
    AdvisoryCommitteeValidaton.updateAdvisoryCommitteeValidationSchema,
  ),
  AdvisoryCommitteeControllers.updateAdvisoryCommittee,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  AdvisoryCommitteeControllers.deleteAdvisoryCommittee,
)

export const AdvisoryCommitteeRoutes = router
