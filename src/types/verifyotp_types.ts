import {z} from 'zod';
import {ResendOTPSchema, VerifyOTPSchema} from 'schema/otpSchema';

export type VerifyOTPRequest = z.infer<typeof VerifyOTPSchema>;

export type ResendOTPRequest = z.infer<typeof ResendOTPSchema>;
