import { useState } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import MobileNav from "./MobileNav";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getDrFoodloveRecommendations, DrFoodloveRequest, DrFoodloveRecommendation, HealthInsights } from "@/api/drfoodlove";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/components/ui/use-toast";

export default function DrFoodlove() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<DrFoodloveRecommendation[]>([]);
  const [healthInsights, setHealthInsights] = useState<HealthInsights | null>(null);
  const [conversation, setConversation] = useState<string | null>(null);
  const [foodItem, setFoodItem] = useState<any | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      // Call the Dr. Foodlove API
      const response = await getDrFoodloveRecommendations(
        {
          query: query,
          include_user_preferences: true,
          limit: 5,
          detailed_response: true
        },
        token
      );

      if (response.error) {
        toast({
          title: "Error",
          description: response.error.detail || "Failed to get recommendations",
          variant: "destructive"
        });
      } else if (response.data) {
        setRecommendations(response.data.recommendations || []);
        setHealthInsights(response.data.health_insights || null);
        setConversation(response.data.conversation || null);
        setFoodItem(response.data.food_item || null);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to connect to Dr. Foodlove",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch food item details
  const handleFetchFoodItem = async (itemId: string) => {
    setIsLoading(true);
    
    try {
      const request: DrFoodloveRequest = {
        query: "Tell me about this food item",
        include_user_preferences: true,
        limit: 5,
        detailed_response: true,
        item_id: itemId
      };
      
      const response = await getDrFoodloveRecommendations(request, token);
      
      if (response.error) {
        toast({
          title: "Error",
          description: response.error.detail || "Failed to get food item details",
          variant: "destructive"
        });
        return;
      }
      
      if (response.data) {
        setRecommendations(response.data.recommendations || []);
        setHealthInsights(response.data.health_insights || null);
        setConversation(response.data.conversation || null);
        setFoodItem(response.data.food_item || null);
        
        // If we have a food item, navigate to its detail page
        if (response.data.food_item) {
          navigate(`/dashboard/meal/${response.data.food_item.id}`);
        }
      }
    } catch (err) {
      console.error("Error fetching food item:", err);
      toast({
        title: "Error",
        description: "Failed to get food item details",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback to mock data if API call fails in development
  const handleFallbackMockData = () => {
    if (import.meta.env.DEV) {
      const mockResponse = {
        success: true,
        query: query,
        provider: "Dr. Foodlove AI",
        recommendations: [
          {
            name: "Greek Yogurt Parfait with Berries and Nuts",
            description: "A protein-rich breakfast parfait that's satisfying and supports weight loss.",
            ingredients: ["Greek yogurt", "mixed berries", "almonds", "honey", "cinnamon"],
            preparation: "Layer Greek yogurt with berries and top with a sprinkle of nuts and a drizzle of honey.",
            nutritional_info: {
              calories: 280,
              protein: 18,
              carbs: 30,
              fat: 12,
              fiber: 6
            },
            cuisine_type: "Mediterranean",
            dietary_tags: ["gluten-free", "vegetarian", "high-protein"],
            health_benefits: ["Supports weight loss", "Provides sustained energy", "Rich in antioxidants"]
          },
          {
            name: "Avocado Toast with Poached Egg",
            description: "A balanced breakfast with healthy fats and protein to keep you full.",
            ingredients: ["whole grain bread", "avocado", "egg", "cherry tomatoes", "microgreens", "lemon juice", "salt", "pepper"],
            preparation: "Toast bread, mash avocado with lemon juice and spread on toast. Top with poached egg and garnish with tomatoes and microgreens.",
            nutritional_info: {
              calories: 320,
              protein: 15,
              carbs: 25,
              fat: 18,
              fiber: 8
            },
            cuisine_type: "California",
            dietary_tags: ["vegetarian", "high-fiber"],
            health_benefits: ["Heart-healthy fats", "Sustained energy", "Good for digestion"]
          }
        ],
        user_preferences_applied: true,
        health_insights: {
          variety: 3,
          nutrient_focus: ["protein", "fiber"],
          balance_score: 4,
          recommendations: [
            "These options are well-balanced for weight loss with adequate protein",
            "Consider adding more fiber-rich foods for digestive health"
          ]
        }
      };

      setRecommendations(mockResponse.recommendations);
      setHealthInsights(mockResponse.health_insights);
      toast({
        title: "Using mock data",
        description: "Connected to Dr. Foodlove using mock data",
      });
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/discovermeal")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-[#FF6B00] ml-2">Dr. Foodlove</h1>
        </div>

        {/* AI Nutritionist Introduction */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <Avatar className="h-12 w-12 mr-3 border-2 border-[#FF6B00]">
              <AvatarImage src="/dr-foodlove-avatar.png" />
              <AvatarFallback className="bg-[#FF6B00] text-white">DF</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold">Dr. Foodlove</h2>
              <p className="text-sm text-gray-600">Your AI Nutritionist</p>
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            Hello! I'm Dr. Foodlove, your personal AI nutritionist. Ask me about healthy meal ideas, 
            nutritional advice, or dietary recommendations tailored to your preferences.
          </p>
        </div>

        {/* Query Input */}
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="relative">
            <Textarea 
              placeholder="Ask Dr. Foodlove for meal recommendations..."
              className="pr-12 resize-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="absolute right-2 bottom-2 bg-[#FF6B00] hover:bg-[#E05A00]"
              disabled={isLoading || !query.trim()}
            >
              {isLoading ? (
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
          {import.meta.env.DEV && (
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              className="mt-2 text-xs"
              onClick={handleFallbackMockData}
            >
              Use Mock Data (Dev Only)
            </Button>
          )}
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <div className="h-8 w-8 mx-auto animate-spin rounded-full border-4 border-[#FF6B00] border-t-transparent mb-4" />
            <p className="text-gray-600">Dr. Foodlove is thinking...</p>
          </div>
        )}
        
        {/* Display conversation if available */}
        {conversation && !isLoading && (
          <Card className="mb-6 border-[#FF6B00]/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Dr. Foodlove Says</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm space-y-2">
                {conversation.split('\n').map((line, i) => (
                  <p key={i} className={line.trim() === '' ? 'my-2' : 'my-1'}>
                    {line}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Display food item if available */}
        {foodItem && !isLoading && (
          <Card className="mb-6 border-[#FF6B00]/20 cursor-pointer hover:shadow-md transition-shadow" 
                onClick={() => navigate(`/dashboard/meal/${foodItem.id}`)}>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Food Item Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <h3 className="font-bold text-lg">{foodItem.title}</h3>
                <p className="text-gray-700">{foodItem.description}</p>
                {foodItem.image_url && (
                  <img 
                    src={foodItem.image_url} 
                    alt={foodItem.title} 
                    className="w-full h-40 object-cover rounded-md my-2"
                  />
                )}
                <div className="flex flex-wrap gap-2 mt-2">
                  {foodItem.dietary_requirements && foodItem.dietary_requirements.map((req: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {req}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">Click to view details</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Recommendations</h2>
            
            {/* Health Insights Card */}
            {healthInsights && (
              <Card className="mb-6 border-[#FF6B00]/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Health Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Balance Score:</span>
                      <span className="font-medium">{healthInsights.balance_score}/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Nutrient Focus:</span>
                      <div className="flex gap-1">
                        {healthInsights.nutrient_focus.map((nutrient: string, i: number) => (
                          <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="text-sm text-gray-600 block mb-1">Recommendations:</span>
                      <ul className="text-sm space-y-1 pl-4 list-disc">
                        {healthInsights.recommendations.map((rec: string, i: number) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Food Recommendation Cards */}
            {recommendations.map((rec, index) => (
              <Card key={index} className="overflow-hidden border-[#FF6B00]/20">
                <CardHeader className="pb-2">
                  <CardTitle>{rec.name}</CardTitle>
                  <CardDescription>{rec.cuisine_type} Cuisine</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-gray-700">{rec.description}</p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Ingredients:</h4>
                    <div className="flex flex-wrap gap-1">
                      {rec.ingredients && rec.ingredients.map((ingredient: string, i: number) => (
                        <Badge key={i} variant="outline" className="bg-gray-50">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Preparation:</h4>
                    <p className="text-sm text-gray-700">{rec.preparation}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-1">Nutritional Info:</h4>
                    <div className="grid grid-cols-5 gap-2 text-center">
                      <div className="text-xs">
                        <span className="block font-medium">{rec.nutritional_info?.calories}</span>
                        <span className="text-gray-500">cal</span>
                      </div>
                      <div className="text-xs">
                        <span className="block font-medium">{rec.nutritional_info?.protein}g</span>
                        <span className="text-gray-500">protein</span>
                      </div>
                      <div className="text-xs">
                        <span className="block font-medium">{rec.nutritional_info?.carbs}g</span>
                        <span className="text-gray-500">carbs</span>
                      </div>
                      <div className="text-xs">
                        <span className="block font-medium">{rec.nutritional_info?.fat}g</span>
                        <span className="text-gray-500">fat</span>
                      </div>
                      <div className="text-xs">
                        <span className="block font-medium">{rec.nutritional_info?.fiber}g</span>
                        <span className="text-gray-500">fiber</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Add a button to fetch food item if it has an ID */}
                  {rec.food_id && (
                    <Button 
                      variant="outline" 
                      className="w-full mt-2"
                      onClick={() => handleFetchFoodItem(rec.food_id)}
                    >
                      View Food Details
                    </Button>
                  )}
                </CardContent>
                <CardFooter className="flex flex-wrap gap-1 pt-0">
                  {rec.dietary_tags && rec.dietary_tags.map((tag: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {tag}
                    </Badge>
                  ))}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
} 