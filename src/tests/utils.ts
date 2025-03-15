import { DummyTokenUserRequest } from "@/api/types";
import { apiRequest } from "@/api/api";
import { ResponseType } from "@/api/types";

export type DummyCredentials = {
  access_token: string;
  token_type: string;
  email: string;
};

export async function getDummyCredentials(): Promise<
  ResponseType<DummyCredentials>
> {
  return await apiRequest<DummyCredentials, DummyTokenUserRequest>(
    "/api/v1/users/dev/token",
    {
      email: "dummy@student.rmit.edu.au",
    },
    "GET",
  );
}
