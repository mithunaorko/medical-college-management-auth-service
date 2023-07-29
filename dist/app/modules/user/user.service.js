"use strict";
/*
  -> Only Database logic here / Business logic
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../../../config/index"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const student_model_1 = require("../student/student.model");
const user_model_1 = require("./user.model");
const user_utils_1 = require("./user.utils");
// import { generateFacultyId } from './user.utils'
// create user
const createStudent = (student, user) => __awaiter(void 0, void 0, void 0, function* () {
    // default password
    if (!user.password) {
        user.password = index_1.default.default_student_pass;
    }
    user.role = 'student';
    const academicsemester = yield academicSemester_model_1.AcademicSemester.findById(student.academicSemester).lean();
    // create student with user
    // generate student
    let newUserAllData = null;
    const session = yield mongoose_1.default.startSession();
    try {
        // first start the session transaction
        session.startTransaction();
        const id = yield (0, user_utils_1.generateStudentId)(academicsemester);
        // custom id same as user id and same as student id
        user.id = id;
        student.id = id;
        // (array)
        const newStudent = yield student_model_1.Student.create([student], { session });
        if (!newStudent.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create student!');
        }
        // create user
        // set student -> _id into user.student
        user.student = newStudent[0]._id;
        const newUser = yield user_model_1.User.create([user], { session });
        if (!newUser.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create User!');
        }
        newUserAllData = newUser[0];
        // commit the transaction
        yield session.commitTransaction();
        // end the session
        yield session.endSession();
    }
    catch (error) {
        // if got any error abort the transaction
        yield session.abortTransaction();
        // end the session
        yield session.endSession();
        // throw error
        throw error;
    }
    if (newUserAllData) {
        newUserAllData = yield user_model_1.User.findOne({ id: newUserAllData.id }).populate({
            path: 'student',
            populate: [
                {
                    path: 'academicSemester'
                },
                {
                    path: 'academicDepartment'
                },
                {
                    path: 'academicFaculty'
                },
            ]
        });
    }
    return newUserAllData;
});
exports.userService = {
    createStudent,
};
