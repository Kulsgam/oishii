import { registerUser } from "@/api/users";
import { validUserData, invalidUserData } from "./data";

describe("registerUser Integration Test", () => {
  it("should register a user successfully with real backend", async () => {
    const email = `testuser${Date.now()}@student.rmit.edu.au`;
    const response = await registerUser({
      ...validUserData,
      email,
    });

    expect(response).toHaveProperty("error", null);
    expect(response).toHaveProperty("data");
    expect(response).toHaveProperty("data");
    expect(response.data).not.toBeNull();

    expect(response.data).toHaveProperty("id");
    expect(response.data?.email).toBe(email);
  });

  it("should return a validation error for invalid user data", async () => {
    const response = await registerUser(invalidUserData);

    expect(response).toHaveProperty("data", null);
    expect(response).toHaveProperty("error");
    expect(response.error).not.toBeNull();
  });
});
