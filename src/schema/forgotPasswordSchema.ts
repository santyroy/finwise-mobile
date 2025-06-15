import {z} from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
});
