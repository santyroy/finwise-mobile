import {SignUpSchema} from 'schema/signupSchema';
import {z} from 'zod';

export type SignupRequest = z.infer<typeof SignUpSchema>;

export interface UserResponse {
  userId: string;
  name: string;
  email: string;
  mobileNumber: string;
  roles: string[];
}
