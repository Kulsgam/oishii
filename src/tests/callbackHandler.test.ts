import { callbackHandler } from "@/api/users";
import { validCallbackData, invalidCallbackData } from "./data.test";
import { getDummyCredentials } from "./utils.test";

describe("callbackHandler Integration Test", () => {
  it("should successfully process the callback with valid data", async () => {
    const { accessToken: authToken } = await getDummyCredentials();
    const newValidCallbackData = {
      tokenHash: "dummy", // TODO: Change this to actual token hash after getting the dummy token
      ...validCallbackData,
    };
    const response = await callbackHandler(newValidCallbackData);

    expect(typeof response).toBe("string");
    expect(response).not.toBe(""); // Ensures a valid response is returned
  });

  it("should throw an error for invalid callback data", async () => {
    await expect(callbackHandler(invalidCallbackData)).rejects.toThrow();
  });
});
