import {VerifyOTPSchema} from 'schema/otpSchema';
import {z} from 'zod';

export type VerifyOTPRequest = z.infer<typeof VerifyOTPSchema>;
