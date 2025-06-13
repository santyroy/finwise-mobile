import {z} from 'zod';

export const VerifyOTPSchema = z.object({
  otp: z
    .string({message: 'OTP is mandatory'})
    .regex(/^\d{6}$/, {message: 'OTP must be 6 digits'}),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
});
