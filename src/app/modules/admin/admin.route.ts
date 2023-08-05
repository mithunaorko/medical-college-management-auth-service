import express from 'express';
import { AdminController } from './admin.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './admin.validation';

const router = express.Router();

// get single admin 
router.get('/:id', AdminController.getSingleAdmin);

// get all admin 
router.get('/', AdminController.getAllAdmins)

// update admin 
router.patch('/:id',validateRequest(AdminValidation.updateAdmin) ,AdminController.updateAdmin)

// delete admin 
router.delete('/:id', AdminController.deleteAdmin)

export const AdminRoutes = router