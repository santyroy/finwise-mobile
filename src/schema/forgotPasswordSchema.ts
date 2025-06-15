import {z} from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
});

export const ResetPasswordSchema = z.object({
  otp: z
    .array(z.string().length(1, 'Each digit must be 1 character'))
    .length(6, 'OTP must be exactly 6 digits'),
  otp2: z
    .array(z.string().length(1))
    .length(6)
    .transform(val => val.join(''))
    .refine(val => /^\d{6}$/.test(val), {message: 'OTP must be 6 digits'}),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  password: z.string({message: 'Password is required'}),
  confirmPassword: z.string({message: 'Password is required'}),
});
