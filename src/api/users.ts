import {
  ApiError,
  RegisterUserRequest,
  RegisterUserResponse,
  VerifyUserRequest,
} from "./types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import api from "./api";

export async function apiRequest<T, D = undefined>(
  url: string,
  data?: D, // Data for POST/PATCH requests
  contentType: string = "application/json",
  method: "GET" | "POST" | "PATCH" = "POST",
  authToken?: string,
): Promise<T> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": contentType,
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      ...(method === "GET" ? { params: data } : { data }),
    };

    const response = await api(config);
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
  return apiRequest<RegisterUserResponse, RegisterUserRequest>(
    "/api/v1/users/register",
    userData,
  );
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<RegisterUserResponse> {
  return apiRequest<RegisterUserResponse, VerifyUserRequest>(
    "/api/v1/users/verify",
    userData,
    "application/json",
    "GET",
  );
}
