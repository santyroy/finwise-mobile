import {AxiosError} from 'axios';
import {SignupRequest, UserResponse} from 'types/signup_types';
import API from './apiConfig';

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
        console.error(
          'Server error:',
          error.response.status,
          error.response.data,
        );
      } else if (error.request) {
        // Request was made but no response received
        console.error('Network error:', error.message);
      } else {
        // Error occurred in setting up the request
        console.error('Error:', error.message);
      }
    } else {
      // Handle non-Axios errors (e.g., type assertion errors)
      console.error('Unexpected error:', error);
    }
    throw error;
  }
};
