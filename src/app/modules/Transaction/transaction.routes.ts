import express from 'express'
import { USER_ROLE } from '../Users/user.constant'
import auth from '../../middlewares/auth'
import validateRequest from '../../middlewares/validateRequest'
import { TransactionValidation } from './transaction.validation'
import { TransactionControllers } from './transaction.controller'

const router = express.Router()

router.post(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(TransactionValidation.createTransactionValidationSchema),
  TransactionControllers.createTransaction,
)

router.get('/', TransactionControllers.getAllTransaction)

router.get('/:id', TransactionControllers.getSingleTransaction)

router.patch(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  validateRequest(TransactionValidation.updateTransactionValidationSchema),
  TransactionControllers.updateTransaction,
)

router.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.super_admin),
  TransactionControllers.deleteTransaction,
)

export const TransactionRoutes = router
