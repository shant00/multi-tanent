import { z } from 'zod';


const LoginZodSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
})



export const AuthValidation = {
  LoginZodSchema,
  refreshTokenZodSchema
};
