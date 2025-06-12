import {
  SignupRequest,
  UserResponse,
  VerifySignUpRequest,
} from 'types/signup_types';
import API from './apiConfig';
import CustomError from 'data/CustomError';
import {ApiResponse} from 'types/apiResponse_types';
import {handleApiError} from '@utils/apiUtils';

// signup user
export const signup = async (
  data: SignupRequest,
): Promise<ApiResponse<UserResponse>> => {
  try {
    const response = await API.post('/api/v1/auth/signup', data);
    const responseData = response.data;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return response.data as ApiResponse<UserResponse>;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// verify signup user
export const verifySignupUser = async (
  data: VerifySignUpRequest,
): Promise<ApiResponse<string>> => {
  try {
    const response = await API.post('/api/v1/auth/confirm', data);
    const responseData = response.data;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return response.data as ApiResponse<string>;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
