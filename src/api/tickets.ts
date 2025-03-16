import { apiRequest } from "./api";
import { ResponseType, TicketBalanceResponse } from "./types";

export async function getTicketBalance(
  authToken: string,
): Promise<ResponseType<TicketBalanceResponse>> {
  return apiRequest<TicketBalanceResponse, null>(
    "/api/v1/tickets/tickets/balance",
    null,
    "POST",
    authToken,
  );
}
