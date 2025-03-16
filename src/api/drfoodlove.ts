import { apiRequest } from "./api";
import { ResponseType } from "./types";

export interface DrFoodloveRecommendation {
  name: string;
  description: string;
  ingredients: string[];
  preparation: string;
  nutritional_info: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  cuisine_type: string;
  dietary_tags: string[];
  health_benefits: string[];
}

export interface HealthInsights {
  variety: number;
  nutrient_focus: string[];
  balance_score: number;
  recommendations: string[];
}

export interface DrFoodloveResponse {
  success: boolean;
  query: string;
  provider: string;
  recommendations: DrFoodloveRecommendation[];
  user_preferences_applied: boolean;
  health_insights?: HealthInsights;
  error?: string;
}

export interface DrFoodloveRequest {
  query: string;
  include_user_preferences: boolean;
  limit: number;
  detailed_response: boolean;
  custom_preferences?: Record<string, any>;
}

/**
 * Get food recommendations from Dr. Foodlove AI
 */
export async function getDrFoodloveRecommendations(
  request: DrFoodloveRequest,
  authToken?: string
): Promise<ResponseType<DrFoodloveResponse>> {
  return apiRequest<DrFoodloveResponse>(
    "api/v1/recommendations/dr-foodlove",
    request,
    "POST",
    authToken
  );
}

/**
 * Upload a food image to get recommendations from Dr. Foodlove AI
 */
export async function getDrFoodloveImageRecommendations(
  query: string,
  foodImage: File,
  includeUserPreferences: boolean = false,
  limit: number = 5,
  detailedResponse: boolean = false,
  customPreferences?: Record<string, any>,
  authToken?: string
): Promise<ResponseType<DrFoodloveResponse>> {
  const formData = new FormData();
  formData.append("query", query);
  formData.append("food_image", foodImage);
  formData.append("include_user_preferences", String(includeUserPreferences));
  formData.append("limit", String(limit));
  formData.append("detailed_response", String(detailedResponse));
  
  if (customPreferences) {
    formData.append("custom_preferences", JSON.stringify(customPreferences));
  }
  
  return apiRequest<DrFoodloveResponse>(
    "api/v1/recommendations/dr-foodlove/image",
    formData,
    "POST",
    authToken,
    "multipart/form-data"
  );
} 