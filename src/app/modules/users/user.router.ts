import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { createAdminValidationSchema } from '../admin/admin.validation'
import { UserControllers } from './user.controller'
import { UserValidation } from './user.validation'

const router = express.Router()
router.post(
  '/create-admin',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  // upload.single('file'),
  // (req: Request, res: Response, next: NextFunction) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
)

router.post(
  '/change-status/:id',
  // auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
)

router.get(
  '/me',
  // auth(
  //   USER_ROLE.superAdmin,
  //   USER_ROLE.admin,
  //   USER_ROLE.user,
  // ),
  UserControllers.getMe,
)

export const userRoutes = router
