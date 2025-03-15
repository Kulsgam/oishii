import { apiRequest } from "./api";
import {
  CreateNoficationRequest,
  GetNotificationsQueryParams,
  MarkNotificationsRequest,
  Notification,
  ResponseType,
} from "./types";

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

export async function markAllNotifications(
  requestBody: MarkNotificationsRequest,
  authToken: string,
): Promise<ResponseType<Notification[]>> {
  return apiRequest<Notification[], MarkNotificationsRequest>(
    "/api/v1/notifications/notifications",
    requestBody,
    "PATCH",
    authToken,
  );
}

export async function markNotification(
  notificationId: string,
  requestBody: MarkNotificationsRequest,
  authToken: string,
): Promise<ResponseType<Notification>> {
  return apiRequest<Notification, MarkNotificationsRequest>(
    `/api/v1/notifications/notifications/${notificationId}`,
    requestBody,
    "PATCH",
    authToken,
  );
}

export async function deleteNotification(
  notificationId: string,
  authToken: string,
): Promise<ResponseType<string>> {
  return apiRequest<string, null>(
    `/api/v1/notifications/notifications/${notificationId}`,
    null,
    "DELETE",
    authToken,
  );
}

export async function createNearbyFoodNotifications(
  radius: number,
  authToken: string,
): Promise<ResponseType<string>> {
  return apiRequest<string, null>(
    `/api/v1/notifications/notifications/nearby-foods?radius=${radius}`,
    null,
    "POST",
    authToken,
  );
}

export async function createNotification(
  requestBody: CreateNoficationRequest,
  authToken: string,
): Promise<ResponseType<Notification>> {
  return apiRequest<Notification, CreateNoficationRequest>(
    "/api/v1/notifications/notifications",
    requestBody,
    "POST",
    authToken,
  );
}
