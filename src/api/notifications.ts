import { apiRequest } from "./api";
import { GetNotificationsQueryParams, ResponseType } from "./types";

export async function getNotifications(
  queryParams: GetNotificationsQueryParams,
  authToken: string,
): Promise<ResponseType<Notification[]>> {
  return apiRequest<Notification[], GetNotificationsQueryParams>(
    "/api/v1/notifications/notifications",
    queryParams,
    "GET",
    authToken,
  );
}
