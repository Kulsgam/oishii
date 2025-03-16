import { apiRequest } from "./api";
import {
  SearchRecommdationQueryParams,
  SearchRecommendationResponseType,
  ResponseType,
  Preference,
} from "./types";

export async function searchRecommendations(
  requestBody: SearchRecommdationQueryParams,
  authToken: string,
): Promise<ResponseType<SearchRecommendationResponseType>> {
  return apiRequest<
    SearchRecommendationResponseType,
    SearchRecommdationQueryParams
  >("/api/v1/recommendations/search", requestBody, "POST", authToken);
}

export async function updatePreferences(
  requestBody: Preference,
  authToken: string,
): Promise<ResponseType<string>> {
  return apiRequest<string, Preference>(
    "/api/v1/recommendations/preferences",
    requestBody,
    "POST",
    authToken,
  );
}
