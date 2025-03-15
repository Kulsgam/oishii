import { registerUser } from "@/api/users";
import { validUserData, invalidUserData } from "./data";

describe("registerUser Integration Test", () => {
  it("should register a user successfully with real backend", async () => {
    const response = await registerUser(validUserData);

    expect(response).toHaveProperty("id");
    expect(response.email).toBe(validUserData.email);
    expect(response.is_verified).toBe(true); // Based on expected API behavior
  });

  it("should return a validation error for invalid user data", async () => {
    await expect(registerUser(invalidUserData)).rejects.toThrow();
  });
});
