"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const student_constant_1 = require("../student/student.constant");
/*
request validation using zod
-----------------------------
  -> req-validation
  -> body --> object
  -> data --> object
*/
// const createUserZodSchema = z.object({
//   body: z.object({
//     role: z.string({
//       required_error: 'role is required'
//     }),
//     password: z.string().optional()
//   }),
// });
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        password: zod_1.z.string().optional(),
        student: zod_1.z.object({
            name: zod_1.z.object({
                firstName: zod_1.z.string({
                    required_error: 'First name is required!',
                }),
                lastName: zod_1.z.string({
                    required_error: 'Last name is required!',
                }),
                middleName: zod_1.z.string().optional(),
            }),
            gender: zod_1.z.enum([...student_constant_1.gender], {
                required_error: 'Gender is required!',
            }),
            dateOfBirth: zod_1.z.string({
                required_error: 'Date of birth is required!',
            }),
            email: zod_1.z
                .string({
                required_error: 'Email is required!',
            })
                .email(),
            contactNo: zod_1.z.string({
                required_error: 'Contact number is required!',
            }),
            emergencyContactNo: zod_1.z.string({
                required_error: 'Emergency contact Number is required!',
            }),
            bloodGroup: zod_1.z.enum([...student_constant_1.bloodGroup]).optional(),
            presentAddress: zod_1.z.string({
                required_error: 'is required!',
            }),
            permanentAddress: zod_1.z.string({
                required_error: 'is required!',
            }),
            academicSemester: zod_1.z.string({
                required_error: 'Academic semester is required',
            }),
            academicDepartment: zod_1.z.string({
                required_error: 'Academic department is required',
            }),
            academicFaculty: zod_1.z.string({
                required_error: 'Academic faculty is required',
            }),
            guardian: zod_1.z.object({
                fatherName: zod_1.z.string({
                    required_error: 'Father name is required!',
                }),
                fatherOccupation: zod_1.z.string({
                    required_error: 'Father occupation is required!',
                }),
                fatherContactNo: zod_1.z.string({
                    required_error: 'Father contact name is required!',
                }),
                motherName: zod_1.z.string({
                    required_error: 'Mother name is required!',
                }),
                motherOccupation: zod_1.z.string({
                    required_error: 'Mother occupation is required!',
                }),
                motherContactNo: zod_1.z.string({
                    required_error: 'Mother contact number is required!',
                }),
                address: zod_1.z.string({
                    required_error: 'Guardian address is required!',
                }),
            }),
            localGuardian: zod_1.z.object({
                name: zod_1.z.string({
                    required_error: 'Local guardian name is required!',
                }),
                occupation: zod_1.z.string({
                    required_error: 'Local guardian occupation is required!',
                }),
                contactNo: zod_1.z.string({
                    required_error: 'Local guardian contact number is required!',
                }),
                address: zod_1.z.string({
                    required_error: 'Local guardian address is required!',
                }),
            }),
            profileImage: zod_1.z.string().optional(),
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
