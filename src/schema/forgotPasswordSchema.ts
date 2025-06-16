import {z} from 'zod';

export const ForgotPasswordSchema = z.object({
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
});

export const ResetPasswordSchema = z
  .object({
    // otp: z
    //   .array(
    //     z
    //       .string({message: 'OTP is required'})
    //       .length(1, 'Each digit must be 1 character'),
    //   )
    //   .length(6, 'OTP must be exactly 6 digits'),
    // otp2: z
    //   .array(z.string().length(1))
    //   .length(6)
    //   .transform(val => val.join(''))
    //   .refine(val => /^\d{6}$/.test(val), {message: 'OTP must be 6 digits'}),
    email: z.string({message: 'Email is required'}).email('Invalid Email'),
    newPassword: z.string({message: 'New Password is required'}),
    confirmPassword: z.string({message: 'Confirm Password is required'}),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'], // Attach error to `confirmPassword`
  });
