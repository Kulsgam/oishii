import { apiRequest } from "./api";
import { ResponseType } from "./types";
import { getValidDataStaxToken, handleDataStaxTokenError } from "@/utils/datastaxAuth";

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
  conversation?: string;
  food_item?: any;
}

export interface DrFoodloveRequest {
  query: string;
  include_user_preferences: boolean;
  limit: number;
  detailed_response: boolean;
  custom_preferences?: Record<string, any>;
  item_id?: string;
}

// =========================================================
// MOCK DATA FOR DR. FOODLOVE
// =========================================================

// Mock food recommendations with lighter descriptions
const MOCK_RECOMMENDATIONS: DrFoodloveRecommendation[] = [
  {
    name: "Protein-Packed Buddha Bowl",
    description: "A nutrient-dense bowl with quinoa, chickpeas, and colorful vegetables. Provides sustained energy and supports fitness goals.",
    ingredients: ["quinoa", "chickpeas", "avocado", "kale", "sweet potato", "red cabbage", "tahini", "lemon juice"],
    preparation: "Cook quinoa and roast chickpeas. Arrange ingredients in a bowl and drizzle with tahini-lemon dressing.",
    nutritional_info: {
      calories: 450,
      protein: 15,
      carbs: 55,
      fat: 20,
      fiber: 12
    },
    cuisine_type: "Fusion",
    dietary_tags: ["vegetarian", "gluten-free", "high-protein"],
    health_benefits: ["muscle recovery", "digestive health", "immune support"]
  },
  {
    name: "Wild-Caught Salmon with Vegetables",
    description: "Omega-3 rich salmon with seasonal roasted vegetables. Supports brain health and provides quality protein.",
    ingredients: ["salmon fillet", "broccoli", "bell peppers", "zucchini", "red onion", "olive oil", "lemon", "herbs"],
    preparation: "Season salmon with herbs. Roast vegetables until caramelized. Bake salmon until just cooked through.",
    nutritional_info: {
      calories: 380,
      protein: 28,
      carbs: 18,
      fat: 22,
      fiber: 6
    },
    cuisine_type: "Mediterranean",
    dietary_tags: ["gluten-free", "dairy-free", "pescatarian"],
    health_benefits: ["brain health", "anti-inflammatory", "heart health"]
  },
  {
    name: "Greek Yogurt Parfait",
    description: "Protein-rich breakfast with Greek yogurt, berries, and nuts. Great for gut health and balanced nutrition.",
    ingredients: ["Greek yogurt", "mixed berries", "almonds", "walnuts", "chia seeds", "honey", "cinnamon"],
    preparation: "Layer yogurt with berries and nuts. Drizzle with honey and sprinkle with cinnamon.",
    nutritional_info: {
      calories: 280,
      protein: 20,
      carbs: 25,
      fat: 12,
      fiber: 8
    },
    cuisine_type: "Mediterranean-inspired",
    dietary_tags: ["vegetarian", "gluten-free", "probiotic-rich"],
    health_benefits: ["gut health", "muscle recovery", "antioxidant-rich"]
  },
  {
    name: "Lentil and Vegetable Soup",
    description: "Hearty, fiber-rich soup with lentils and vegetables. Great for digestive health and sustained energy.",
    ingredients: ["green lentils", "carrots", "celery", "onion", "garlic", "tomatoes", "spinach", "vegetable broth"],
    preparation: "Sauté vegetables, add lentils and broth. Simmer until tender and season to taste.",
    nutritional_info: {
      calories: 320,
      protein: 18,
      carbs: 45,
      fat: 6,
      fiber: 15
    },
    cuisine_type: "Mediterranean",
    dietary_tags: ["vegan", "gluten-free", "high-fiber"],
    health_benefits: ["digestive health", "heart health", "blood sugar regulation"]
  },
  {
    name: "Turmeric Chicken with Cauliflower Rice",
    description: "Anti-inflammatory turmeric chicken with low-carb cauliflower rice. Great for recovery and weight management.",
    ingredients: ["chicken breast", "turmeric", "ginger", "garlic", "cauliflower", "coconut oil", "cilantro", "lime"],
    preparation: "Season chicken with spices and grill. Process cauliflower into rice-sized pieces and sauté until tender.",
    nutritional_info: {
      calories: 350,
      protein: 35,
      carbs: 12,
      fat: 15,
      fiber: 5
    },
    cuisine_type: "Asian-fusion",
    dietary_tags: ["gluten-free", "dairy-free", "low-carb"],
    health_benefits: ["anti-inflammatory", "muscle building", "weight management"]
  }
];

// Simple health insights
const MOCK_HEALTH_INSIGHTS: HealthInsights = {
  variety: 4,
  nutrient_focus: ["protein", "fiber", "healthy fats"],
  balance_score: 5,
  recommendations: [
    "Your meal selections provide a good balance of nutrients",
    "The variety of foods ensures diverse nutrient intake",
    "Consider adding more leafy greens for additional vitamins"
  ]
};

// Short conversation elements
const CONVERSATION_ELEMENTS = [
  "Based on your query, here are some balanced options for your health goals.",
  "Here are some recommendations based on your interests.",
  "I've selected these options based on nutritional value and flavor.",
  "These balanced meals should provide good nutrition and satisfy your preferences."
];

// =========================================================
// API FUNCTIONS
// =========================================================

/**
 * Get food recommendations from Dr. Foodlove AI
 */
export async function getDrFoodloveRecommendations(
  request: DrFoodloveRequest,
  authToken?: string
): Promise<ResponseType<DrFoodloveResponse>> {
  // Using mock data instead of API call
  console.log("🍎 USING MOCK DATA: Dr. Foodlove recommendations");
  console.log("📝 Query:", request.query);
  
  // Select a conversation element
  const randomIndex = Math.floor(Math.random() * CONVERSATION_ELEMENTS.length);
  const conversation = CONVERSATION_ELEMENTS[randomIndex];
  
  // Filter recommendations based on query keywords
  let filteredRecommendations = [...MOCK_RECOMMENDATIONS];
  const query = request.query.toLowerCase();
  
  // Simple keyword filtering
  if (query.includes("vegetarian") || query.includes("vegan") || query.includes("plant")) {
    console.log("🥦 Filtering for vegetarian/vegan options");
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.dietary_tags.some(tag => ["vegetarian", "vegan"].includes(tag))
    );
  }
  
  if (query.includes("protein") || query.includes("muscle") || query.includes("workout")) {
    console.log("💪 Filtering for high-protein options");
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.dietary_tags.includes("high-protein") || rec.nutritional_info.protein > 20
    );
  }
  
  if (query.includes("breakfast") || query.includes("morning")) {
    console.log("🍳 Filtering for breakfast options");
    filteredRecommendations = filteredRecommendations.filter(rec => 
      rec.name.includes("Parfait") || rec.name.includes("Toast") || rec.dietary_tags.includes("breakfast")
    );
  }
  
  // If no recommendations match the filters, return all recommendations
  if (filteredRecommendations.length === 0) {
    console.log("⚠️ No matching recommendations, using all options");
    filteredRecommendations = MOCK_RECOMMENDATIONS;
  }
  
  // Limit the number of recommendations
  const limitedRecommendations = filteredRecommendations.slice(0, request.limit);
  console.log(`✅ Returning ${limitedRecommendations.length} recommendations`);
  
  // Create mock response
  const mockResponse: DrFoodloveResponse = {
    success: true,
    query: request.query,
    provider: "Dr. Foodlove AI",
    recommendations: limitedRecommendations,
    user_preferences_applied: request.include_user_preferences,
    conversation: conversation,
    health_insights: request.detailed_response ? MOCK_HEALTH_INSIGHTS : undefined
  };
  
  return { data: mockResponse, error: null };
  
  /* Original API call code - commented out
  try {
    // Get a valid DataStax token
    const datastaxToken = await getValidDataStaxToken();
    
    // Make the API request
    const response = await apiRequest<DrFoodloveResponse, DrFoodloveRequest>(
      "api/v1/recommendations/dr-foodlove",
      request,
      "POST",
      authToken
    );
    
    return response;
  } catch (error: any) {
    // Check if error is due to expired DataStax token
    const newToken = await handleDataStaxTokenError(error);
    
    if (newToken) {
      // Retry the request with the new token
      return apiRequest<DrFoodloveResponse, DrFoodloveRequest>(
        "api/v1/recommendations/dr-foodlove",
        request,
        "POST",
        authToken
      );
    }
    
    // If token refresh failed or error is not related to token, return the error
    return { data: null, error: error.response?.data || { detail: "Error getting recommendations" } };
  }
  */
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
  // Using mock data instead of API call
  console.log("🍎 USING MOCK DATA: Dr. Foodlove image recommendations");
  console.log("📝 Query:", query);
  console.log("🖼️ Image:", foodImage.name);
  
  // Create a request object to reuse the same mock data logic
  const request: DrFoodloveRequest = {
    query: query,
    include_user_preferences: includeUserPreferences,
    limit: limit,
    detailed_response: detailedResponse,
    custom_preferences: customPreferences
  };
  
  // Use the same mock data function
  return getDrFoodloveRecommendations(request, authToken);
  
  /* Original API call code - commented out
  try {
    // Get a valid DataStax token
    const datastaxToken = await getValidDataStaxToken();
    
    const formData = new FormData();
    formData.append("query", query);
    formData.append("food_image", foodImage);
    formData.append("include_user_preferences", String(includeUserPreferences));
    formData.append("limit", String(limit));
    formData.append("detailed_response", String(detailedResponse));
    
    if (customPreferences) {
      formData.append("custom_preferences", JSON.stringify(customPreferences));
    }
    
    // Make the API request
    const response = await apiRequest<DrFoodloveResponse, FormData>(
      "api/v1/recommendations/dr-foodlove/image",
      formData,
      "POST",
      authToken,
      "multipart/form-data"
    );
    
    return response;
  } catch (error: any) {
    // Check if error is due to expired DataStax token
    const newToken = await handleDataStaxTokenError(error);
    
    if (newToken) {
      // Retry the request with the new token
      const formData = new FormData();
      formData.append("query", query);
      formData.append("food_image", foodImage);
      formData.append("include_user_preferences", String(includeUserPreferences));
      formData.append("limit", String(limit));
      formData.append("detailed_response", String(detailedResponse));
      
      if (customPreferences) {
        formData.append("custom_preferences", JSON.stringify(customPreferences));
      }
      
      return apiRequest<DrFoodloveResponse, FormData>(
        "api/v1/recommendations/dr-foodlove/image",
        formData,
        "POST",
        authToken,
        "multipart/form-data"
      );
    }
    
    // If token refresh failed or error is not related to token, return the error
    return { data: null, error: error.response?.data || { detail: "Error getting image recommendations" } };
  }
  */
} 