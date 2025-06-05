export interface ApiErrorResponse {
  timestamp: Date;
  status: number;
  error: string;
  message: string;
  path: string;
  details: string[];
  code: string;
}
