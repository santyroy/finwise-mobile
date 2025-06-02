import {z} from 'zod';

export const SignInSchema = z.object({
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  password: z
    .string({message: 'Password is required'})
    .min(6, 'Password must be min of 6 characters'),
});
