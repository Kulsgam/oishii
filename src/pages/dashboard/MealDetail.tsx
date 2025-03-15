import { ArrowLeft, Clock, MapPin, Tag, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useNavigate, useParams } from "react-router"
import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import MobileNav from "./MobileNav"
import { fetchMealById } from "@/api/meals"

interface Meal {
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
}

export default function MealDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMeal = async () => {
      try {
        if (!id) return;
        setLoading(true);
        const data = await fetchMealById(id);
        setMeal(data);
        setError(null);
      } catch (err) {
        setError("Failed to load meal details. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadMeal();
  }, [id]);

  const handleSwapRequest = () => {
    navigate(`/dashboard/mealswap/${id}`);
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="px-4 py-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Skeleton className="h-8 w-40 ml-2" />
          </div>
          <Skeleton className="h-64 w-full rounded-lg mb-4" />
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2 mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
          <div className="space-y-2 mb-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
          <Skeleton className="h-10 w-full" />
        </div>
        <MobileNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="px-4 py-6">
          <div className="flex items-center mb-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold ml-2">Error</h1>
          </div>
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-700">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  if (!meal) return null;

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="px-4 py-6 pb-20">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-bold ml-2">Meal Details</h1>
        </div>

        {/* Meal Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
          <img
            src={meal.image_url || "https://placehold.co/600x400?text=No+Image"}
            alt={meal.title}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Meal Title and Cook */}
        <h2 className="text-2xl font-bold mb-1">{meal.title}</h2>
        <div className="flex items-center text-gray-600 mb-4">
          <User className="h-4 w-4 mr-1" />
          <span>by {meal.user_name}</span>
        </div>

        {/* Meal Description */}
        <p className="text-gray-700 mb-6">{meal.description}</p>

        {/* Meal Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start">
            <Tag className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Tickets Required</p>
              <p className="text-gray-600">{meal.tickets_required} ticket{meal.tickets_required !== 1 ? 's' : ''}</p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Location</p>
              <p className="text-gray-600">{meal.location}</p>
            </div>
          </div>

          <div className="flex items-start">
            <Clock className="h-5 w-5 mr-2 text-[#FF6B00] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Pickup Times</p>
              <div className="text-gray-600">
                {meal.pickup_times && meal.pickup_times.length > 0 ? (
                  meal.pickup_times.map((time, index) => (
                    <p key={index}>{time}</p>
                  ))
                ) : (
                  <p>No pickup times specified</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dietary Requirements & Allergens */}
        <div className="mb-6">
          <h3 className="font-bold mb-2">Dietary Information</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {meal.dietary_requirements && meal.dietary_requirements.length > 0 ? (
              meal.dietary_requirements.map((req, index) => (
                <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {req}
                </Badge>
              ))
            ) : (
              <p className="text-gray-600 text-sm">No specific dietary requirements</p>
            )}
          </div>
          
          <h3 className="font-bold mb-2">Allergens</h3>
          <p className="text-gray-600">{meal.allergens || "None specified"}</p>
        </div>

        {/* Swap Button */}
        <Button 
          className="w-full bg-[#FF6B00] hover:bg-[#E05A00] text-white" 
          onClick={handleSwapRequest}
          disabled={!meal.is_available}
        >
          {meal.is_available ? "Request Swap" : "Not Available"}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
} 