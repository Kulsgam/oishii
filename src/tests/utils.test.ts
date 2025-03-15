import { DummyTokenUserResponse, TokenUserResponse } from "@/api/types";
import { apiRequest } from "@/api/users";

export type DummyCredentials = {
  accessToken: string;
  tokenType: string;
  email: string;
};

export async function getDummyCredentials(): Promise<DummyTokenUserResponse> {
  const { accessToken, tokenType } = await apiRequest<TokenUserResponse>(
    "/api/v1/token",
    {
      email: "dummy@gmail.com",
    },
    "application/json",
    "GET",
  );

  return {
    accessToken,
    tokenType,
    email: "dummy@gmail.com",
  };
}
