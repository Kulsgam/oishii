import { getUserProfile, updateUserProfile } from "@/api/users";
import { validProfileUpdateData, invalidProfileUpdateData } from "./data";
import { getDummyCredentials } from "./utils";

describe("getUserProfile Integration Test", () => {
  let validAuthToken: string;

  beforeAll(async () => {
    const credentials = await getDummyCredentials();
    expect(credentials).toHaveProperty("data");
    expect(credentials.data).not.toBeNull();
    validAuthToken = credentials.data!.accessToken;
  });

  it("should successfully retrieve the user profile with a valid auth token", async () => {
    const response = await getUserProfile(validAuthToken);

    expect(response).toHaveProperty("error", null);
    expect(response).toHaveProperty("data");
    expect(response.data).not.toBeNull();

    expect(response.data).toHaveProperty("id");
    expect(response.data).toHaveProperty("email");
    expect(response.data).toHaveProperty("first_name");
    expect(response.data!.is_verified).toBe(true);
  });

  it("should return an error for an invalid auth token", async () => {
    const response = await getUserProfile("invalid");

    expect(response).toHaveProperty("data", null);
    expect(response).toHaveProperty("error");
    expect(response.error).toBeNull();
  });
});

describe("updateUserProfile Integration Test", () => {
  let validAuthToken: string;

  beforeAll(async () => {
    const credentials = await getDummyCredentials();
    expect(credentials).toHaveProperty("data");
    expect(credentials.data).not.toBeNull();
    validAuthToken = credentials.data!.accessToken;
  });

  it("should successfully update the user profile with valid data", async () => {
    const response = await updateUserProfile(
      validAuthToken,
      validProfileUpdateData,
    );

    expect(response).toHaveProperty("error", null);
    expect(response).toHaveProperty("data");
    expect(response.data).not.toBeNull();

    expect(response.data!.email).toBe(validProfileUpdateData.email);
    expect(response.data!.first_name).toBe(validProfileUpdateData.first_name);
  });

  it("should return an error when updating the profile with invalid data", async () => {
    const response = await updateUserProfile(
      validAuthToken,
      invalidProfileUpdateData,
    );

    expect(response).toHaveProperty("data", null);
    expect(response).toHaveProperty("error");
    expect(response.error).not.toBeNull();
  });

  it("should return an error when updating the profile with an invalid auth token", async () => {
    const response = await updateUserProfile("invalid", validProfileUpdateData);

    expect(response).toHaveProperty("data", null);
    expect(response).toHaveProperty("error");
    expect(response.error).not.toBeNull();
  });
});
