import {
  RegisterUserError,
  RegisterUserRequest,
  RegisterUserResponse,
} from "./types";
import axios, { AxiosError } from "axios";
import api from "./api";

export async function registerUser(
  userData: RegisterUserRequest,
): Promise<RegisterUserResponse> {
  try {
    const response = await api.post<RegisterUserResponse>(
      "/api/v1/users/register",
      userData,
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<RegisterUserError>;
      if (axiosError.response && axiosError.response.status === 422) {
        throw new Error(
          `Validation error: ${JSON.stringify(axiosError.response.data.detail)}`,
        );
      }
    }
    throw new Error("An unexpected error occurred while registering the user");
  }
}
