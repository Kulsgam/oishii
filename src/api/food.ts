import { apiRequest } from "./api";
import {
  FoodType,
  CreateFoodResponse,
  ResponseType,
  GetFoodsQueryParams,
  Foods,
  GetFoodsNearbyQueryParams,
} from "./types";

export async function createFood(
  userData: FoodType,
  authToken: string,
): Promise<ResponseType<CreateFoodResponse>> {
  return apiRequest<CreateFoodResponse, FoodType>(
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
