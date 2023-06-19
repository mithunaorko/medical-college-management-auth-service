import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/user-create', validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema));

export const AcademicSemesterRoutes = router;