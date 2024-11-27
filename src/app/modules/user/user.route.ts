import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { UserValidation } from './user.validation';
const router = express.Router();



router.post(
  '/register',
  validateRequest(UserValidation.RegistrationZodSchema),
  AuthController.registerUser
);

router.put(
  '/update',
  validateRequest(UserValidation.UpdateUserZodSchema),
  AuthController.updateUser
);


export const UserRoutes = router;
