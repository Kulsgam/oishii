import axios, { AxiosRequestConfig } from "axios";
import { ResponseType } from "./types";

// Determine the API base URL based on the environment
const isDevelopment = import.meta.env.DEV;
const API_BASE_URL = isDevelopment 
  ? "http://localhost:8000/" 
  : "https://oishii-backend.fly.dev/";

console.log(`Using API base URL: ${API_BASE_URL}`);

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;

export async function apiRequest<T, D = undefined>(
  url: string,
  data?: D, // Data for POST/PATCH requests
  method: "GET" | "POST" | "PATCH" | "DELETE" = "POST",
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
      console.error("API request error:", error.message);
      if (error.response) {
        // The request was made and the server responded with a status code outside the 2xx range
        console.error("Response error data:", error.response.data);
        return { data: null, error: error.response.data };
      } else if (error.request) {
        // The request was made but no response was received (e.g., network error)
        console.error("Network error - no response received");
        return { data: null, error: { detail: "Network error" } };
      } else {
        // Something else happened in setting up the request
        return { data: null, error: { detail: "Request error" } };
      }
    } else {
      // Non-Axios error (unexpected issue)
      console.error("Unexpected error:", error);
      return { data: null, error: { detail: "Unexpected error" } };
    }
  }
}
