import { apiRequest } from "./api";
import {
  FoodType,
  ResponseType,
  GetFoodsQueryParams,
  Foods,
  GetFoodsNearbyQueryParams,
  GetFoodByUserIdParams,
  GetPersonalizedFoodsQueryParams,
  SearchFoodRequestResponse,
  SearchFoodRequestQueryParams,
  SearchFoodRequestResponsElement,
} from "./types";

export async function createFood(
  userData: FoodType,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, FoodType>(
    "/api/v1/foods/foods",
    userData,
    "POST",
    authToken,
  );
}

export async function getFoods(
  queryParams: GetFoodsQueryParams,
  authToken: string,
): Promise<ResponseType<Foods>> {
  return apiRequest<Foods, GetFoodsQueryParams>(
    "/api/v1/foods/foods",
    queryParams,
    "GET",
    authToken,
  );
}

export async function getFoodsNearby(
  queryParams: GetFoodsNearbyQueryParams,
  authToken: string,
): Promise<ResponseType<Foods>> {
  return apiRequest<Foods, GetFoodsNearbyQueryParams>(
    "/api/v1/foods/nearby",
    queryParams,
    "GET",
    authToken,
  );
}

export async function getFoodById(
  foodId: string,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, void>(
    `/api/v1/foods/foods/${foodId}`,
    undefined,
    "GET",
    authToken,
  );
}

export async function updateFoodById(
  foodId: string,
  userData: FoodType,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, FoodType>(
    `/api/v1/foods/foods/${foodId}`,
    userData,
    "PATCH",
    authToken,
  );
}

export async function deleteFoodById(
  foodId: string,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, void>(
    `/api/v1/foods/foods/${foodId}`,
    undefined,
    "DELETE",
    authToken,
  );
}

export async function getUserFoodByUserId(
  queryParams: GetFoodByUserIdParams,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, GetFoodByUserIdParams>(
    "/api/v1/foods/user/foods/",
    queryParams,
    "GET",
    authToken,
  );
}

export async function fullfillFoodReq(
  foodId: string,
  authToken: string,
): Promise<ResponseType<FoodType>> {
  return apiRequest<FoodType, void>(
    `/api/v1/foods/foods/${foodId}/fulfill`,
    undefined,
    "PATCH",
    authToken,
  );
}

export async function getPersonalizedFoods(
  queryParams: GetPersonalizedFoodsQueryParams,
  authToken: string,
): Promise<ResponseType<Foods>> {
  return apiRequest<Foods, GetPersonalizedFoodsQueryParams>(
    "/api/v1/foods/foods/search/personalized",
    queryParams,
    "GET",
    authToken,
  );
}

export async function searchFoodRequests(
  requestBody: SearchFoodRequestQueryParams,
  authToken: string,
): Promise<ResponseType<SearchFoodRequestResponse>> {
  return apiRequest<SearchFoodRequestResponse, SearchFoodRequestQueryParams>(
    "/api/v1/foods/foods/search/requests",
    requestBody,
    "GET",
    authToken,
  );
}

export async function getFoodRecommendations(
  limit: number,
  include_requests: boolean,
  authToken: string,
): Promise<ResponseType<SearchFoodRequestResponsElement>> {
  return apiRequest<SearchFoodRequestResponsElement, null>(
    `/api/v1/foods/foods/recommendations?limit=${limit}&include_requests=${include_requests}`,
    null,
    "GET",
    authToken,
  );
}
