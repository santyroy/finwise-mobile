export interface ApiErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
  details: string[];
  code: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
