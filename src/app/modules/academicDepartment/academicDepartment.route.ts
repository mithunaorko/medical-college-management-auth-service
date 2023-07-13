import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';

const router = express.Router();

// Create department
router.post(
  '/create-department',
  AcademicDepartmentController.createDepartment
);

// get single department
router.get('/:id', AcademicDepartmentController.getSingleDepartment);

// get all department
router.get('/', AcademicDepartmentController.getAllDepartments);

// update faculty
router.patch('/:id', validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), AcademicDepartmentController.updateDepartment)

// delete department
router.delete('/:id', AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoutes = router;
