"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcademicDepartmentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const academicDepartment_controller_1 = require("./academicDepartment.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const academicDepartment_validation_1 = require("./academicDepartment.validation");
const router = express_1.default.Router();
// Create department
router.post('/create-department', academicDepartment_controller_1.AcademicDepartmentController.createDepartment);
// get single department
router.get('/:id', academicDepartment_controller_1.AcademicDepartmentController.getSingleDepartment);
// get all department
router.get('/', academicDepartment_controller_1.AcademicDepartmentController.getAllDepartments);
// update faculty
router.patch('/:id', (0, validateRequest_1.default)(academicDepartment_validation_1.AcademicDepartmentValidation.updateAcademicDepartmentZodSchema), academicDepartment_controller_1.AcademicDepartmentController.updateDepartment);
// delete department
router.delete('/:id', academicDepartment_controller_1.AcademicDepartmentController.deleteDepartment);
exports.AcademicDepartmentRoutes = router;
