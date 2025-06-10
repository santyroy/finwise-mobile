import {z} from 'zod';

export const SignUpSchema = z.object({
  name: z.string({message: 'Name is required'}).regex(/^[a-zA-Z0-9\s]+$/, {
    message: 'Name can only contain letters, numbers, and spaces',
  }),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  password: z
    .string({message: 'Password is required'})
    .min(8, 'Password must be min of 8 characters'),
  mobileNumber: z
    .string({message: 'Mobile number is mandatory'})
    .regex(/^\d{10}$/, {message: 'Mobile number must be exactly 10 digits'}),
});

export const VerifySignUpSchema = z.object({
  otp: z
    .string({message: 'OTP is mandatory'})
    .regex(/^\d{6}$/, {message: 'OTP must be 6 digits'}),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
});
