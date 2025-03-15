import { apiRequest } from "./api";
import {
  CreateSwapRequest,
  CreateSwapResponse,
  GetNearbySwapsQueryParams,
  GetNearbySwapsResponse,
  GetSwapsQueryParams,
  GetSwapsResponse,
  ResponseType,
  Swap,
  SwapDetail,
  UpdateSwapStatusRequest,
} from "./types";

export async function createSwap(
  swapData: CreateSwapRequest,
  authToken: string,
): Promise<ResponseType<CreateSwapResponse>> {
  return apiRequest<CreateSwapResponse, CreateSwapRequest>(
    "/api/v1/swaps/swaps",
    swapData,
    "POST",
    authToken,
  );
}

export async function getSwaps(
  queryParams: GetSwapsQueryParams,
  authToken: string,
): Promise<ResponseType<GetSwapsResponse>> {
  return apiRequest<GetSwapsResponse, GetSwapsQueryParams>(
    "/api/v1/swaps/swaps",
    queryParams,
    "GET",
    authToken,
  );
}

export async function getSwapById(
  swapId: string,
  authToken: string,
): Promise<ResponseType<Swap>> {
  return apiRequest<Swap>(
    `/api/v1/swaps/swaps/${swapId}`,
    undefined,
    "GET",
    authToken,
  );
}

export async function updateSwapStatus(
  swapId: string,
  updateData: UpdateSwapStatusRequest,
  authToken: string,
): Promise<ResponseType<Swap>> {
  return apiRequest<Swap, UpdateSwapStatusRequest>(
    `/api/v1/swaps/swaps/${swapId}`,
    updateData,
    "PATCH",
    authToken,
  );
}

export async function getSwapDetail(
  swapId: string,
  authToken: string,
): Promise<ResponseType<SwapDetail>> {
  return apiRequest<SwapDetail>(
    `/api/v1/swaps/swaps/${swapId}/detail`,
    undefined,
    "GET",
    authToken,
  );
}

export async function getNearbySwaps(
  queryParams: GetNearbySwapsQueryParams,
  authToken: string,
): Promise<ResponseType<GetNearbySwapsResponse>> {
  return apiRequest<GetNearbySwapsResponse, GetNearbySwapsQueryParams>(
    "/api/v1/swaps/swaps/nearby",
    queryParams,
    "GET",
    authToken,
  );
}
