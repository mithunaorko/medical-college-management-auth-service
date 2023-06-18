import { z } from "zod";

/*
request validation using zod
-----------------------------
  -> req-validation
  -> body --> object
  -> data --> object
*/

const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'role is required'
    }),
    password: z.string().optional()
  }),
});

export const UserValidation = {
  createUserZodSchema,
};