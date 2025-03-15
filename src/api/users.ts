import { apiRequest } from "./api";
import {
  CallbackUserRequest,
  RegisterUserRequest,
  FullUserProfile,
  VerifyUserRequest,
  ResponseType,
  UpdateUserProfileRequest,
  LoginRequest,
  LoginResponse,
} from "./types";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  location: string;
  dietary_requirements: string[];
  allergies: string[];
  rating: number;
  tickets: number;
  meals_shared: number;
  meals_received: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  dietary_requirements?: string[];
  allergies?: string[];
  location?: string;
  bio?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export interface UpdateProfileData {
  name?: string;
  bio?: string;
  location?: string;
  dietary_requirements?: string[];
  allergies?: string[];
  avatar_url?: string;
}

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

export async function getPublicProfile(
  userId: string,
  authToken: string,
): Promise<ResponseType<FullUserProfile>> {
  return apiRequest<FullUserProfile>(
    `/api/v1/users/${userId}`,
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

/**
 * Login a user with email and password
 * @param credentials Login credentials
 * @returns Promise with auth data or error
 */
export async function login(
  credentials: LoginCredentials
): Promise<ResponseType<LoginResponse>> {
  // Create form data
  const formData = new URLSearchParams();
  formData.append('username', credentials.username);
  formData.append('password', credentials.password);
  
  return apiRequest<LoginResponse>(
    "/api/v1/users/login",
    formData.toString(),
    "POST",
    undefined,
    "application/x-www-form-urlencoded"
  );
}

/**
 * Register a new user
 * @param userData User registration data
 * @returns Promise with auth data or error
 */
export async function register(
  userData: RegisterData
): Promise<ResponseType<AuthResponse>> {
  return apiRequest<AuthResponse, RegisterData>(
    "/api/v1/users/register",
    userData,
    "POST"
  );
}

/**
 * Get the current user's profile
 * @param authToken Authentication token
 * @returns Promise with user profile or error
 */
export async function getCurrentUser(
  authToken: string
): Promise<ResponseType<UserProfile>> {
  return apiRequest<UserProfile>(
    "/api/v1/users/me",
    undefined,
    "GET",
    authToken
  );
}

/**
 * Update the current user's profile
 * @param profileData Profile data to update
 * @param authToken Authentication token
 * @returns Promise with updated user profile or error
 */
export async function updateProfile(
  profileData: UpdateProfileData,
  authToken: string
): Promise<ResponseType<UserProfile>> {
  return apiRequest<UserProfile, UpdateProfileData>(
    "/api/v1/users/me",
    profileData,
    "PATCH",
    authToken
  );
}

/**
 * Get a user's profile by ID
 * @param userId User ID
 * @param authToken Authentication token
 * @returns Promise with user profile or error
 */
export async function getUserById(
  userId: string,
  authToken: string
): Promise<ResponseType<UserProfile>> {
  return apiRequest<UserProfile>(
    `/api/v1/users/${userId}`,
    undefined,
    "GET",
    authToken
  );
}

/**
 * Upload a profile avatar
 * @param file File to upload
 * @param authToken Authentication token
 * @returns Promise with upload result or error
 */
export async function uploadAvatar(
  file: File,
  authToken: string
): Promise<ResponseType<{ avatar_url: string }>> {
  const formData = new FormData();
  formData.append("file", file);
  
  return apiRequest<{ avatar_url: string }>(
    "/api/v1/users/avatar",
    formData,
    "POST",
    authToken,
    "multipart/form-data"
  );
}

export async function loginUser(
  userData: LoginRequest,
): Promise<ResponseType<{ access_token: string; token_type: string }>> {
  // Create form data
  const formData = new URLSearchParams();
  formData.append('username', userData.username);
  formData.append('password', userData.password);
  
  return apiRequest<{ access_token: string; token_type: string }>(
    "/api/v1/users/login",
    formData.toString(),
    "POST",
    undefined,
    "application/x-www-form-urlencoded"
  );
}
