import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.LoginZodSchema),
  AuthController.loginUser
);

router.get('/refresh-token', validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken,);

export const AuthRoutes = router;
