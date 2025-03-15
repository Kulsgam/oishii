import { registerUser } from "@/api/users";
import { RegisterUserRequest } from "@/api/types";

describe("registerUser Integration Test", () => {
  const validUserData: RegisterUserRequest = {
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

  const invalidUserData: RegisterUserRequest = {
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

  it("should register a user successfully with real backend", async () => {
    const response = await registerUser(validUserData);

    expect(response).toHaveProperty("id");
    expect(response.email).toBe(validUserData.email);
    expect(response.is_verified).toBe(true); // Based on expected API behavior
  });

  it("should return a validation error for invalid user data", async () => {
    await expect(registerUser(invalidUserData)).rejects.toThrowError();
  });
});
