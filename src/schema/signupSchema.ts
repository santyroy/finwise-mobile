import {z} from 'zod';

export const SignUpSchema = z.object({
  name: z.string({message: 'Name is required'}).regex(/^[a-zA-Z0-9\s]+$/, {
    message: 'Name can only contain letters, numbers, and spaces',
  }),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  password: z
    .string({message: 'Password is required'})
    .min(6, 'Password must be min of 6 characters'),
});
