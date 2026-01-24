export interface ApiResponse<T> {
  data: T;
  message: string;
  state: string;
  isError: boolean;
  isSuccess: boolean;
  errors: any[];
}