import { apiRequest } from "./api";
import { ResponseType } from "./types";

export interface Meal {
  id: string;
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
  user_id: string;
  user_name: string;
  user_rating: number;
  created_at: string;
  updated_at: string;
}

export interface MealsResponse {
  meals: Meal[];
  total: number;
}

export interface MealFilters {
  category?: string;
  food_type?: string;
  dietary_requirement?: string;
  is_available?: boolean;
  is_homemade?: boolean;
  location?: string;
  allergen_free?: string;
  search?: string;
  max_tickets?: number;
  skip?: number;
  limit?: number;
}

/**
 * Fetch a meal by its ID
 * @param id The meal ID
 * @param authToken Authentication token
 * @returns Promise with meal data or error
 */
export async function fetchMealById(
  id: string,
  authToken?: string
): Promise<Meal> {
  const response = await apiRequest<Meal>(
    `/api/v1/foods/foods/${id}`,
    undefined,
    "GET",
    authToken
  );
  
  if (response.error) {
    throw new Error(response.error.detail || "Failed to fetch meal");
  }
  
  return response.data!;
}

/**
 * Fetch meals with optional filtering
 * @param filters Optional filters for the meals
 * @param authToken Authentication token
 * @returns Promise with meals data or error
 */
export async function fetchMeals(
  filters?: MealFilters,
  authToken?: string
): Promise<MealsResponse> {
  const response = await apiRequest<Meal[]>(
    "/api/v1/foods/foods",
    filters,
    "GET",
    authToken
  );
  
  if (response.error) {
    throw new Error(response.error.detail || "Failed to fetch meals");
  }
  
  return {
    meals: response.data || [],
    total: response.data?.length || 0
  };
}

/**
 * Fetch nearby meals based on location
 * @param location Location string
 * @param distance Distance in kilometers
 * @param filters Additional filters
 * @param authToken Authentication token
 * @returns Promise with meals data or error
 */
export async function fetchNearbyMeals(
  location: string,
  distance: number = 5.0,
  filters?: Omit<MealFilters, 'location'>,
  authToken?: string
): Promise<MealsResponse> {
  const response = await apiRequest<Meal[]>(
    "/api/v1/foods/foods/nearby",
    {
      location,
      distance,
      ...filters
    },
    "GET",
    authToken
  );
  
  if (response.error) {
    throw new Error(response.error.detail || "Failed to fetch nearby meals");
  }
  
  return {
    meals: response.data || [],
    total: response.data?.length || 0
  };
}

/**
 * Fetch personalized meal recommendations
 * @param authToken Authentication token (required)
 * @returns Promise with meals data or error
 */
export async function fetchRecommendedMeals(
  authToken: string
): Promise<MealsResponse> {
  const response = await apiRequest<Meal[]>(
    "/api/v1/foods/foods/recommendations",
    undefined,
    "GET",
    authToken
  );
  
  if (response.error) {
    throw new Error(response.error.detail || "Failed to fetch meal recommendations");
  }
  
  return {
    meals: response.data || [],
    total: response.data?.length || 0
  };
} 