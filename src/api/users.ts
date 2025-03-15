import {
  ApiError,
  RegisterUserRequest,
  RegisterUserResponse,
  VerifyUserRequest,
} from "./types";
import axios, { AxiosError } from "axios";
import api from "./api";

async function apiPost<T>(url: string, data: object): Promise<T> {
  try {
    const response = await api.post<T>(url, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      if (axiosError.response && axiosError.response.status === 422) {
        throw new Error(
          `Validation error: ${JSON.stringify(axiosError.response.data.detail)}`,
        );
      }
    }
    throw new Error(
      "An unexpected error occurred while processing the request",
    );
  }
}

export async function registerUser(
  userData: RegisterUserRequest,
): Promise<RegisterUserResponse> {
  return apiPost<RegisterUserResponse>("/api/v1/users/register", userData);
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<RegisterUserResponse> {
  return apiPost<RegisterUserResponse>("/api/v1/users/verify", userData);
}
