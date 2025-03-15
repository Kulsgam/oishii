import { callbackHandler } from "@/api/users";
import { validCallbackData, invalidCallbackData } from "./data";
import { getDummyCredentials } from "./utils";

describe("callbackHandler Integration Test", () => {
  it("should successfully process the callback with valid data", async () => {
    const { data: dummyCredentials, error } = await getDummyCredentials();

    expect(error).toBeNull();
    expect(dummyCredentials).not.toBeNull();

    if (!dummyCredentials) {
      throw new Error("Failed to retrieve dummy credentials");
    }

    const newValidCallbackData = {
      tokenHash: "dummy", // TODO: Replace with actual token hash once available
      ...validCallbackData,
    };

    const response = await callbackHandler(newValidCallbackData);

    expect(typeof response).toBe("string");
    expect(response).not.toBe(""); // Ensures a valid response is returned
  });

  it("should return an error for invalid callback data", async () => {
    const response = await callbackHandler(invalidCallbackData);

    expect(typeof response).toBe("object");
    expect(response).toHaveProperty("error");
    expect(response.error).toBe("Invalid callback data");
  });
});
