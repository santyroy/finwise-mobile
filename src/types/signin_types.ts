import {SignInSchema} from 'schema/signinSchema';
import {z} from 'zod';

export type SignInRequest = z.infer<typeof SignInSchema>;

export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  name: string;
  email: string;
  roles: string[];
};
