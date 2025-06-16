import {z} from 'zod';
import {
  ForgotPasswordSchema,
  ResetPasswordSchema,
} from '@schema/forgotPasswordSchema';

export type ForgotPasswordRequest = z.infer<typeof ForgotPasswordSchema>;

export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export type ResetPasswordRequest = ResetPasswordSchemaType & {otp: string};
