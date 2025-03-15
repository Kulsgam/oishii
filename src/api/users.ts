import { apiRequest } from "./api";
import {
  ApiError,
  CallbackUserRequest,
  RegisterUserRequest,
  FullUserProfile,
  VerifyUserRequest,
  UpdateUserProfileRequest,
} from "./types";

export async function registerUser(
  userData: RegisterUserRequest,
): Promise<FullUserProfile | ApiError> {
  return apiRequest<FullUserProfile, RegisterUserRequest>(
    "/api/v1/users/register",
    userData,
  );
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<FullUserProfile | ApiError> {
  return apiRequest<FullUserProfile, VerifyUserRequest>(
    "/api/v1/users/verify",
    userData,
    "GET",
  );
}

export async function callbackHandler(
  userData: CallbackUserRequest,
): Promise<string | ApiError> {
  return apiRequest<string, CallbackUserRequest>(
    "/api/v1/users/callback",
    userData,
    "GET",
  );
}

export async function getUserProfile(
  authToken: string,
): Promise<FullUserProfile | ApiError> {
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
): Promise<FullUserProfile | ApiError> {
  return apiRequest<FullUserProfile, UpdateUserProfileRequest>(
    "/api/v1/users/profile",
    userData,
    "PATCH",
    authToken,
  );
}
