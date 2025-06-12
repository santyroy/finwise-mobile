import {AxiosError} from 'axios';
import CustomError from 'data/CustomError';

// Centralized error handling function
export const handleApiError = (error: unknown): never => {
  // Handle non-Axios errors (e.g., type assertion errors)
  if (!(error instanceof AxiosError)) {
    throw new CustomError(500, 'Unexpected Error');
  }

  // Handle specific Axios errors
  const {response, request, message} = error;

  if (response) {
    // Server responded with an error status
    throw new CustomError(
      response.status,
      response.data?.message || 'Server Error',
    );
  }
  if (request) {
    // Request was made but no response received
    throw new CustomError(500, 'Network Error - Unable to reach the server');
  }

  // Axios encountered an issue while setting up the request
  throw new CustomError(500, message);
};
