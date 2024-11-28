import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { ResumeRoutes } from '../modules/resume/resume.route';
import { SchemaRoutes } from '../modules/schema/schema.route';
import { SchoolRoutes } from '../modules/school/school.route';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/schema',
    route: SchemaRoutes,
  },
  {
    path: '/resume',
    route: ResumeRoutes,

  }, {
    path: '/school',
    route: SchoolRoutes,
  }
];



moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
