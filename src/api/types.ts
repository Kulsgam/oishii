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
  delivery_method?: string; // "pickup", "delivery", or "flexible"
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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
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
