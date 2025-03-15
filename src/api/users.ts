import {
  ApiError,
  RegisterUserRequest,
  RegisterUserResponse,
  TokenUserRequest,
  TokenUserResponse,
  VerifyUserRequest,
} from "./types";
import axios, { AxiosError } from "axios";
import api from "./api";
import qs from "qs";

async function apiRequest<T>(
  url: string,
  data?: object | string,
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

    const response = await api({
      method,
      url,
      data,
      headers,
    });

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
  return apiRequest<RegisterUserResponse>("/api/v1/users/register", userData);
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<RegisterUserResponse> {
  return apiRequest<RegisterUserResponse>("/api/v1/users/verify", userData);
}

export async function accessToken(
  userData: TokenUserRequest,
): Promise<TokenUserResponse> {
  return apiRequest<TokenUserResponse>(
    "/api/v1/token",
    qs.stringify(userData),
    "application/x-www-form-urlencoded",
  );
}
