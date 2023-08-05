import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

//old
//============
// router.post(
//   '/create-user',
//   validateRequest(UserValidation.createUserZodSchema),
//   UserController.createUser
// );

// for create Student user
router.post(
  '/create-student',
  validateRequest(UserValidation.createStudentZodSchema),
  UserController.createStudent
);

// for create Faculty user
router.post(
  '/create-faculty',
  validateRequest(UserValidation.createFacultyZodSchema),
  UserController.createFaculty
);

// for create Admin user
router.post('/create-admin',validateRequest(UserValidation.createAdminZodSchema) ,UserController.createAdmin);

export const UserRoutes = router;
