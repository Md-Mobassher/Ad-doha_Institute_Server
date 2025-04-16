import express from 'express'
import auth from '../../middlewares/auth'
import { DashboardControllers } from './dashboard.controller'
import { USER_ROLE } from '../Users/user.constant'

const router = express.Router()

router.get(
  '/admin',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  DashboardControllers.getAllAdminDashboards,
)

export const DashboardRoutes = router
