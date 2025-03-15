export interface RegisterUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  cook_type: string;
  cook_frequency: string;
  dietary_requirements: string[];
  allergies: string;
  purpose: string;
  home_address: string;
  is_verified: boolean;
  password: string;
}

// Define success response type
export interface FullUserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  cook_type: string;
  cook_frequency: string;
  dietary_requirements: string[];
  allergies: string;
  purpose: string;
  home_address: string;
  profile_picture: string;
  created_at: string;
  updated_at: string;
  swap_rating: number;
  is_verified: boolean;
}

export interface FoodType {
  title: string;
  description: string;
  category: string;
  food_type: string;
  dietary_requirements: string[];
  allergens: string;
  expiry_date: string;
  location: string;
  is_homemade: boolean;
  is_available: boolean;
  pickup_times: string[];
  tickets_required: number;
  image_url: string;
}

export interface GetFoodByUserIdParams {
  userId: string;
  isAvailable?: boolean;
  skip?: number;
  limit?: number;
}

export interface CreateFoodResponse {
  title: string;
  description: string;
  category: string;
  food_type: string;
  dietary_requirements: string[];
  allergens: string;
  expiry_date: string;
  location: string;
  is_homemade: boolean;
  is_available: boolean;
  pickup_times: string[];
  tickets_required: number;
  image_url: string;
}

export interface UpdateUserProfileRequest
  extends Omit<
    FullUserProfile,
    "id" | "created_at" | "updated_at" | "swap_rating" | "is_verified"
  > {}

export interface TokenUserResponse {
  accessToken: string;
  tokenType: string;
}

export interface VerifyUserRequest {
  token: string;
  confirmationToken: string;
  email: string;
}

export interface DummyTokenUserResponse extends TokenUserResponse {
  email: string;
}

export interface DummyTokenUserRequest {
  email: string;
}

export interface CallbackUserRequest {
  tokenHash: string;
  type: string;
  email: string;
  next: string;
}

export interface TokenUserRequest {
  username: string;
  password: string;
}

// Define error response type
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}
export interface CreateSwapRequest {
  provider_id: string;
  provider_food_id: string;
  requester_food_id: string;
  message: string;
}

export interface CreateSwapResponse {
  id: string;
  provider_id: string;
  requester_id: string;
  provider_food_id: string;
  requester_food_id: string;
  response_message: string;
  status: string; // e.g. "potential", "confirmed", etc.
  created_at: string;
  updated_at: string;
}

export interface GetSwapsQueryParams {
  status?: string;
  role?: string;
}

export interface Swap {
  id: string;
  requester_id: string;
  provider_id: string;
  requester_food_id: string;
  provider_food_id: string;
  message: string;
  response_message: string;
  status: string; // e.g. "potential", "confirmed"
  created_at: string;
  updated_at: string;
}

export interface GetSwapsResponse {
  swaps: Swap[];
}

export interface UpdateSwapStatusRequest {
  status: string; // e.g. "potential", "accepted", "rejected", "completed"
  response_message: string;
}

export interface GetNearbySwapsResponse {
  swaps: SwapDetail[];
}

export interface GetNearbySwapsQueryParams {
  radius: number; // Search radius in kilometers
  status?: string; // e.g. "potential", "accepted", "rejected", etc.
}

export interface SwapDetail extends Swap {
  requester_food: FoodType;
  provider_food: FoodType;
}

export interface Foods {
  foods: FoodType[];
}

export interface GetFoodsQueryParams {
  category?: string;
  food_type?: string;
  dietary_requirement?: string;
  is_available?: boolean;
  is_homemade?: boolean;
  location?: string;
  allergen_free?: boolean;
  search?: string;
  max_tickets?: number;
  skip?: number;
  limit?: number;
}

export interface GetFoodsNearbyQueryParams extends GetFoodsQueryParams {
  distance: number;
}

export interface ApiError {
  detail: ValidationError[] | string;
}

export type ResponseType<D> = {
  data: D | null;
  error: ApiError | null;
};

export interface GetPersonalizedFoodsQueryParams {
  search_term?: string;
  food_type?: string;
  category?: string;
  max_distance?: number;
  max_tickets?: number;
  is_available?: boolean;
  skip?: number;
  limit?: number;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string; // e.g. "swap_request"
  title: string;
  message: string;
  related_id: string; // ID related to the notification (e.g. swap ID)
  is_read: boolean;
  created_at: string;
}

export interface CreateNoficationRequest
  extends Omit<Notification, "id" | "created_at" | "user_id"> {}

/** Query parameters for getting notifications */
export interface GetNotificationsQueryParams {
  is_read?: boolean; // Whether to filter by read/unread
  type?: string; // e.g. "swap_request", "general", etc.
  skip?: number; // Pagination offset
  limit?: number; // Pagination limit
}

export interface MarkNotificationsRequest {
  is_read: boolean; // true to mark as read, false to mark as unread
}
