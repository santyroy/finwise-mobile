import {AxiosError} from 'axios';
import {
  SignupRequest,
  UserResponse,
  VerifySignUpRequest,
} from 'types/signup_types';
import API from './apiConfig';
import CustomError from 'data/CustomError';

// sigmup user
export const signup = async (data: SignupRequest): Promise<UserResponse> => {
  try {
    const response = await API.post('/api/v1/auth/signup', data);
    return response.data;
  } catch (error: unknown) {
    // Handle specific Axios errors
    if (error instanceof AxiosError) {
      if (error.response) {
        // Server responded with a status code that we can handle
        throw new CustomError(error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        throw new CustomError(500, 'Network Error');
      } else {
        // Error occurred in setting up the request
        throw new CustomError(500, error.message);
      }
    } else {
      // Handle non-Axios errors (e.g., type assertion errors)
      throw new CustomError(500, 'Unexpected Error');
    }
  }
};

// verify signup user
export const verifySignupUser = async (
  data: VerifySignUpRequest,
): Promise<string> => {
  try {
    const response = await API.post('/api/v1/auth/confirm', data);
    return response.data;
  } catch (error: unknown) {
    console.log(JSON.stringify(error));
    // Handle specific Axios errors
    if (error instanceof AxiosError) {
      if (error.response) {
        // Server responded with a status code that we can handle
        throw new CustomError(error.response.status, error.response.data);
      } else if (error.request) {
        // Request was made but no response received
        throw new CustomError(500, 'Network Error');
      } else {
        // Error occurred in setting up the request
        throw new CustomError(500, error.message);
      }
    } else {
      // Handle non-Axios errors (e.g., type assertion errors)
      throw new CustomError(500, 'Unexpected Error');
    }
  }
};
