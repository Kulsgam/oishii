import { apiRequest } from "./api";
import { CreateRatingRequest, Rating, ResponseType } from "./types";

export async function createRating(
  requestBody: CreateRatingRequest,
  authToken: string,
): Promise<ResponseType<Rating>> {
  return apiRequest<Rating, CreateRatingRequest>(
    "/api/v1/ratings/ratings",
    requestBody,
    "POST",
    authToken,
  );
}

export async function getUserRatings(
  userId: string,
  authToken: string,
  skip?: number,
  limit?: number,
): Promise<ResponseType<Rating[]>> {
  return apiRequest<Rating[], null>(
    `/api/v1/ratings/ratings/${userId}?skip=${skip ?? 0}&limit=${limit ?? 10}`,
    null,
    "GET",
    authToken,
  );
}

export async function getSwapRatings(
  swapId: string,
  authToken: string,
): Promise<ResponseType<Rating[]>> {
  return apiRequest<Rating[], null>(
    `/api/v1/ratings/ratings/swap/${swapId}`,
    null,
    "GET",
    authToken,
  );
}
