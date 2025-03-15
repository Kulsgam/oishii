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

async function apiPost<T>(
  url: string,
  data: object | string,
  contentType: string = "application/json",
): Promise<T> {
  try {
    const response = await api.post<T>(url, data, {
      headers: {
        "Content-Type": contentType,
      },
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
  return apiPost<RegisterUserResponse>("/api/v1/users/register", userData);
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<RegisterUserResponse> {
  return apiPost<RegisterUserResponse>("/api/v1/users/verify", userData);
}

export async function accessToken(
  userData: TokenUserRequest,
): Promise<TokenUserResponse> {
  return apiPost<TokenUserResponse>(
    "/api/v1/token",
    qs.stringify(userData),
    "application/x-www-form-urlencoded",
  );
}
