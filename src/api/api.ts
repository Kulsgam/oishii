import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ApiError } from "./types";

const api = axios.create({
  baseURL: "https://oishii-backend.fly.dev/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

export async function apiRequest<T, D = undefined>(
  url: string,
  data?: D, // Data for POST/PATCH requests
  method: "GET" | "POST" | "PATCH" = "POST",
  authToken?: string,
  contentType: string = "application/json",
): Promise<T | ApiError> {
  try {
    const headers: Record<string, string> = {
      "Content-Type": contentType,
    };

    if (authToken) {
      headers["Authorization"] = `Bearer ${authToken}`;
    }

    const config: AxiosRequestConfig = {
      method,
      url,
      headers,
      ...(method === "GET" ? { params: data } : { data }),
    };

    const response = await api(config);
    return response.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError<ApiError>;
    if (axiosError.response) {
      return axiosError.response.data;
    } else {
      throw axiosError;
    }
  }
}
