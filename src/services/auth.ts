import API from './apiConfig';
import CustomError from '@data/CustomError';
import {handleApiError} from '@utils/apiUtils';
import {ApiResponse} from 'types/apiResponse_types';
import {SignupRequest, SignupResponse} from 'types/signup_types';
import {SignInRequest, SignInResponse} from 'types/signin_types';
import {ResendOTPRequest, VerifyOTPRequest} from 'types/verifyotp_types';
import {ResetPasswordRequest} from 'types/forgotPassword_types';

// signup user
export const signup = async (
  data: SignupRequest,
): Promise<ApiResponse<SignupResponse>> => {
  try {
    const response = await API.post('/api/v1/auth/signup', data);
    const responseData = response.data as ApiResponse<SignupResponse>;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return responseData;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// verify signup user
export const verifySignupUser = async (
  data: VerifyOTPRequest,
): Promise<ApiResponse<string>> => {
  try {
    const response = await API.post('/api/v1/auth/confirm', data);
    const responseData = response.data as ApiResponse<string>;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return responseData;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// signin user
export const signin = async (
  data: SignInRequest,
): Promise<ApiResponse<SignInResponse>> => {
  try {
    const response = await API.post('/api/v1/auth/login', data);
    const responseData = response.data as ApiResponse<SignInResponse>;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return responseData;
  } catch (error: unknown) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// resend OTP
export const resendOTP = async (
  data: ResendOTPRequest,
): Promise<ApiResponse<string>> => {
  try {
    const response = await API.post('/api/v1/auth/resendOtp', data);
    const responseData = response.data as ApiResponse<string>;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return responseData;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};

// reset passowrd
export const resetPassword = async (
  data: ResetPasswordRequest,
): Promise<ApiResponse<string>> => {
  try {
    const {email, newPassword, otp, otpPurpose} = data;
    const response = await API.post('/api/v1/auth/resetPassword', {
      email,
      password: newPassword,
      otp,
      otpPurpose,
    });
    const responseData = response.data as ApiResponse<string>;
    if (!responseData || !responseData.success) {
      throw new CustomError(500, 'Malformed API Response');
    }
    return responseData;
  } catch (error) {
    handleApiError(error);
    return Promise.reject(error);
  }
};
