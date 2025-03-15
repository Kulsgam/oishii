import {
  CallbackUserRequest,
  RegisterUserRequest,
  UpdateUserProfileRequest,
} from "@/api/types";

export const validUserData: RegisterUserRequest = {
  email: `dummy@student.rmit.edu.au`,
  first_name: "John",
  last_name: "Doe",
  bio: "Cooking enthusiast",
  cook_type: "the meal prepper",
  cook_frequency: "1-2 times",
  dietary_requirements: [],
  allergies: "none",
  purpose: "save on food expenses",
  home_address: "123 Test St",
  is_verified: false,
  password: "securepassword",
};

export const invalidUserData: RegisterUserRequest = {
  email: "invalid-email",
  first_name: "",
  last_name: "", // Required field missing
  bio: "Cooking enthusiast",
  cook_type: "the meal prepper",
  cook_frequency: "1-2 times",
  dietary_requirements: [],
  allergies: "none",
  purpose: "save on food expenses",
  home_address: "123 Test St",
  is_verified: false,
  password: "short",
};

export const validProfileUpdateData: UpdateUserProfileRequest = {
  ...validUserData,
  profile_picture: "new-picture.jpg",
} as UpdateUserProfileRequest;

export const invalidProfileUpdateData: UpdateUserProfileRequest = {
  ...invalidUserData,
  profile_picture: "new-picture.jpg",
} as UpdateUserProfileRequest;

export const validCallbackData: Omit<CallbackUserRequest, "tokenHash"> = {
  type: "verify", // TODO: Check if this is correct
  email: "dummy@student.rmit.edu.au",
  next: "/", // TODO: Check if this is correct
};

export const invalidCallbackData: CallbackUserRequest = {
  tokenHash: "invalid",
  type: "verify",
  email: validUserData.email,
  next: "/",
};
