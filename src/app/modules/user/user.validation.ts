import { z } from 'zod';
const GenderEnum = z.enum(['MALE', 'FEMALE', 'OTHER']);
const RegistrationZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long.' }),
    image: z.string().url({ message: 'Invalid image URL format.' }).optional(),
    gender: GenderEnum,
    email: z.string().email({ message: 'Invalid email format.' }),
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' }),
  }),
});



const UpdateUserZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters long.' })
      .optional(),
    image: z.string().url({ message: 'Invalid image URL format.' }).optional(),
    gender: GenderEnum,
    email: z.string().email({ message: 'Invalid email format.' }).optional(),

  }),
});

export const UserValidation = {
  UpdateUserZodSchema,
  RegistrationZodSchema,
};
