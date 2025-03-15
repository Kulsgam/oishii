import {
  ApiError,
  CallbackUserRequest,
  RegisterUserRequest,
  FullUserProfile,
  VerifyUserRequest,
  UpdateUserProfileRequest,
} from "./types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import api from "./api";

export async function apiRequest<T, D = undefined>(
  url: string,
  data?: D, // Data for POST/PATCH requests
  method: "GET" | "POST" | "PATCH" = "POST",
  authToken?: string,
  contentType: string = "application/json",
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
): Promise<FullUserProfile> {
  return apiRequest<FullUserProfile, RegisterUserRequest>(
    "/api/v1/users/register",
    userData,
  );
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<FullUserProfile> {
  return apiRequest<FullUserProfile, VerifyUserRequest>(
    "/api/v1/users/verify",
    userData,
    "GET",
  );
}

export async function callbackHandler(
  userData: CallbackUserRequest,
): Promise<string> {
  return apiRequest<string, CallbackUserRequest>(
    "/api/v1/users/callback",
    userData,
    "GET",
  );
}

export async function getUserProfile(
  authToken: string,
): Promise<FullUserProfile> {
  return apiRequest<FullUserProfile>(
    "/api/v1/users/profile",
    undefined,
    "GET",
    authToken,
    "application/json",
  );
}

export async function updateUserProfile(
  authToken: string,
  userData: UpdateUserProfileRequest,
): Promise<FullUserProfile> {
  return apiRequest<FullUserProfile, UpdateUserProfileRequest>(
    "/api/v1/users/profile",
    userData,
    "PATCH",
    authToken,
  );
}
