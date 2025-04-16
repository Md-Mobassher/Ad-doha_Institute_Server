import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../Users/user.constant'
import { createContactValidationschema } from './contact.validation'
import { ContactControllers } from './contact.controller'

const router = express.Router()

router.post(
  '/',
  validateRequest(createContactValidationschema),
  ContactControllers.createContact,
)

router.get(
  '/',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  ContactControllers.getAllContacts,
)

router.delete(
  '/:id',
  auth(USER_ROLE.super_admin, USER_ROLE.admin),
  ContactControllers.deleteContact,
)

export const ContactRoutes = router
