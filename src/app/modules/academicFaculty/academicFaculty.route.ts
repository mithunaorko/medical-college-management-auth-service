import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyController } from './academicFaculty.controller';
import { AcademicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// create faculty
router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

// get single semester
router.get('/:id', AcademicFacultyController.getSingleFaculty)

// update faculty
router.patch('/:id', AcademicFacultyController.updateFaculty)

export const AcademicFacultyRoutes = router;
