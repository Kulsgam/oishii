import { verifyUser } from "@/api/users";
import { validUserData, invalidUserData } from "./data.test";
import { VerifyUserRequest } from "@/api/types";

describe("registerUser Integration Test", () => {
  it("should verify a user successfully", async () => {
    const verificationData: VerifyUserRequest = {
      email: validUserData.email,
      code: "123456",
    };
    const response = await verifyUser(verificationData);
    expect(response).toHaveProperty("id");
    expect(response.email).toBe(validUserData.email);
    expect(response.is_verified).toBe(true);
  });

  it("should not verify an invalid email", async () => {
    const verificationData: VerifyUserRequest = {
      email: invalidUserData.email,
      code: "123456",
    };
    await expect(verifyUser(verificationData)).rejects.toThrow();
  });
});
