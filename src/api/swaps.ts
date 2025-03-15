import { apiRequest } from "./api";
import { CreateSwapRequest, CreateSwapResponse, GetSwapsQueryParams, GetSwapsResponse, ResponseType } from "./types";

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
