import { getUserProfile, updateUserProfile } from "@/api/users";
import { validProfileUpdateData, invalidProfileUpdateData } from "./data";
import { getDummyCredentials } from "./utils";

describe("getUserProfile Integration Test", () => {
  let validAuthToken: string;
  beforeAll(async () => {
    validAuthToken = (await getDummyCredentials()).accessToken;
  });
  it("should successfully retrieve the user profile with a valid auth token", async () => {
    const response = await getUserProfile(validAuthToken);

    expect(response).toHaveProperty("id");
    expect(response).toHaveProperty("email");
    expect(response).toHaveProperty("first_name");
    expect(response.is_verified).toBe(true);
  });

  it("should throw an error for an invalid auth token", async () => {
    await expect(getUserProfile("invalid")).rejects.toThrow();
  });
});

describe("updateUserProfile Integration Test", () => {
  let validAuthToken: string;
  beforeAll(async () => {
    validAuthToken = (await getDummyCredentials()).accessToken;
  });
  it("should successfully update the user profile with valid data", async () => {
    const response = await updateUserProfile(
      validAuthToken,
      validProfileUpdateData,
    );

    expect(response).toHaveProperty("id");
    expect(response.email).toBe(validProfileUpdateData.email);
    expect(response.first_name).toBe(validProfileUpdateData.first_name);
  });

  it("should throw an error when updating the profile with invalid data", async () => {
    await expect(
      updateUserProfile(validAuthToken, invalidProfileUpdateData),
    ).rejects.toThrow();
  });

  it("should throw an error when updating the profile with an invalid auth token", async () => {
    await expect(
      updateUserProfile("invalid", validProfileUpdateData),
    ).rejects.toThrow();
  });
});
