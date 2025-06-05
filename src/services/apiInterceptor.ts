import {AxiosError} from 'axios';
import API from './apiConfig';

// Request Interceptor (before sending a request)
API.interceptors.request.use(
  async config => {
    // Add authentication token to headers if needed
    // const token = await getToken();
    const token = null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Request interceptor error: ', error);
    return Promise.reject(error);
  },
);

// Response interceptor (after receiving a reseponse)
API.interceptors.response.use(
  response => {
    // Handle success case (e.g., cache response, logging)
    return response;
  },
  async error => {
    const {response} = error;
    if (response instanceof AxiosError) {
      console.error(
        'Response interceptor error: ',
        response.status,
        response.message,
      );
    } else {
      console.error('Network error: ', error.message);
    }
    return Promise.reject(error);
  },
);
