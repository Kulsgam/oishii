import {
  DummyTokenUserRequest,
  DummyTokenUserResponse,
  TokenUserResponse,
} from "@/api/types";
import { apiRequest } from "@/api/api";

export type DummyCredentials = {
  accessToken: string;
  tokenType: string;
  email: string;
};

export async function getDummyCredentials(): Promise<DummyTokenUserResponse> {
  const { accessToken, tokenType } = await apiRequest<
    TokenUserResponse,
    DummyTokenUserRequest
  >(
    "/api/v1/token",
    {
      email: "dummy@student.rmit.edu.au",
    },
    "GET",
  );

  return {
    accessToken,
    tokenType,
    email: "dummy@student.rmit.edu.au",
  };
}
