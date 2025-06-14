import {z} from 'zod';
import {OtpPurpose} from '@constants/OtpPurpose';

export const VerifyOTPSchema = z.object({
  otp: z
    .string({message: 'OTP is mandatory'})
    .regex(/^\d{6}$/, {message: 'OTP must be 6 digits'}),
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  otpPurpose: z.enum(Object.values(OtpPurpose) as [string, ...string[]], {
    message: 'OTP purpose is mandatory',
  }),
});

export const ResendOTPSchema = z.object({
  email: z.string({message: 'Email is required'}).email('Invalid Email'),
  otpPurpose: z.enum(Object.values(OtpPurpose) as [string, ...string[]], {
    message: 'OTP purpose is mandatory',
  }),
});
