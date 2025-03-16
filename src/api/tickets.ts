import { apiRequest } from "./api";
import {
  ResponseType,
  TicketBalanceResponse,
  GetTicketTransactionsQueryParams,
  TicketTransaction,
} from "./types";

export async function getTicketBalance(
  authToken: string,
): Promise<ResponseType<TicketBalanceResponse>> {
  return apiRequest<TicketBalanceResponse, null>(
    "/api/v1/tickets/tickets/balance",
    null,
    "GET",
    authToken,
  );
}

export async function getTicketTransactions(
  queryParams: GetTicketTransactionsQueryParams,
  authToken: string,
): Promise<ResponseType<TicketTransaction[]>> {
  return apiRequest<TicketTransaction[], GetTicketTransactionsQueryParams>(
    "/api/v1/tickets/tickets/transactions",
    queryParams,
    "GET",
    authToken,
  );
}
