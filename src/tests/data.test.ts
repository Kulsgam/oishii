import { CallbackUserRequest, RegisterUserRequest } from "@/api/types";

export const validUserData: RegisterUserRequest = {
  email: `testuser${Date.now()}@example.com`,
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

export const validCallbackData: Omit<CallbackUserRequest, "tokenHash"> = {
  type: "verify", // TODO: Check if this is correct
  email: "dummy@gmail.com",
  next: "/", // TODO: Check if this is correct
};

export const invalidCallbackData: CallbackUserRequest = {
  tokenHash: "invalid",
  type: "verify",
  email: validUserData.email,
  next: "/",
};
