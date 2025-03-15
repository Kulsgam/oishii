import axios, { AxiosRequestConfig } from "axios";
import { ResponseType } from "./types";

const api = axios.create({
  baseURL: "https://oishii-backend.fly.dev/",
});

export default api;

export async function apiRequest<T, D = undefined>(
  url: string,
  data?: D, // Data for POST/PATCH requests
  method: "GET" | "POST" | "PATCH" = "POST",
  authToken?: string,
  contentType: string = "application/json",
): Promise<ResponseType<T>> {
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
    return { data: response.data, error: null };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        return { data: null, error: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error)
        return { data: null, error: { detail: "Network error" } };
      } else {
        // Something else happened in setting up the request
        return { data: null, error: { detail: "Request error" } };
      }
    } else {
      // Non-Axios error (unexpected issue)
      return { data: null, error: { detail: "Unexpected error" } };
    }
  }
}
