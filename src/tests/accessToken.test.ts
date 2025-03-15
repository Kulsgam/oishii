import { accessToken, registerUser } from "@/api/users";
import { validUserData, invalidUserData } from "./data.test";

describe("accessToken Integration Test", () => {
  beforeAll(async () => {
    await registerUser(validUserData);
  });

  it("should retrieve an access token successfully with real backend", async () => {
    const response = await accessToken({
      username: validUserData.email,
      password: validUserData.password,
    });

    expect(response).toHaveProperty("access_token");
    expect(response.token_type).toBe("bearer");
  });

  it("should return a validation error for invalid user data", async () => {
    await expect(
      accessToken({
        username: invalidUserData.email,
        password: invalidUserData.password,
      }),
    ).rejects.toThrow();
  });
});
