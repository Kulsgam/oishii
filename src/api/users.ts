import { apiRequest } from "./api";
import {
  CallbackUserRequest,
  RegisterUserRequest,
  FullUserProfile,
  VerifyUserRequest,
  ResponseType,
  UpdateUserProfileRequest,
} from "./types";

export async function registerUser(
  userData: RegisterUserRequest,
): Promise<ResponseType<FullUserProfile>> {
  return apiRequest<FullUserProfile, RegisterUserRequest>(
    "/api/v1/users/register",
    userData,
  );
}

export async function verifyUser(
  userData: VerifyUserRequest,
): Promise<ResponseType<FullUserProfile>> {
  return apiRequest<FullUserProfile, VerifyUserRequest>(
    "/api/v1/users/verify",
    userData,
    "GET",
  );
}

export async function callbackHandler(
  userData: CallbackUserRequest,
): Promise<ResponseType<string>> {
  return apiRequest<string, CallbackUserRequest>(
    "/api/v1/users/callback",
    userData,
    "GET",
  );
}

export async function getUserProfile(
  authToken: string,
): Promise<ResponseType<FullUserProfile>> {
  return apiRequest<FullUserProfile>(
    "/api/v1/users/me",
    undefined,
    "GET",
    authToken,
  );
}

export async function updateUserProfile(
  authToken: string,
  userData: UpdateUserProfileRequest,
): Promise<ResponseType<FullUserProfile>> {
  return apiRequest<FullUserProfile, UpdateUserProfileRequest>(
    "/api/v1/users/me",
    userData,
    "PATCH",
    authToken,
  );
}
