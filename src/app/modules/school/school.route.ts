import express from 'express';
import auth from '../../middlewares/auth';
import { SchoolController } from './school.controller';
const router = express.Router();



router.post(
  '/register',
  SchoolController.registerSchool,
);

router.get('/data', auth('TEACHER'), SchoolController.getSchoolData);



export const SchoolRoutes = router;