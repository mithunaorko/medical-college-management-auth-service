import { z } from 'zod';

// login zod schema
const loginZodSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'ID is required!',
    }),
    password: z.string({
      required_error: 'Password is required!',
    }),
  }),
});


// Refresh token zod schema
const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});


// change old password zod schema
const changePasswordZodSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'old password is required!',
    }),
    newPassword: z.string({
      required_error: 'New password is required!',
    }),
  }),
});



export const AuthValidation = {
  loginZodSchema,
  refreshTokenZodSchema,
  changePasswordZodSchema,
};
