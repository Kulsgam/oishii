import { Search, MapPin } from "lucide-react"
// import Image from "next/image"
import { Input } from "@/components/ui/input"
import MobileNav from "./MobileNav"
import { SearchOverlay } from "./SearchOverlay"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { fetchNearbyMeals, fetchMeals, Meal } from "@/api/meals"
import { Skeleton } from "@/components/ui/skeleton"
import { redirectIfUnauthenticated, isAuthenticated } from "@/utils/auth"
import { LocationPicker, Location } from "@/components/maps/LocationPicker"
import { Button } from "@/components/ui/button"
import { LocationMap } from "@/components/maps/LocationMap"

export default function DiscoverMeals() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [showLocationPicker, setShowLocationPicker] = useState(false)
    const [location, setLocation] = useState<Location | null>(null)
    const [deliveryMethod, setDeliveryMethod] = useState<string>("flexible")
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is authenticated
        if (redirectIfUnauthenticated(navigate)) {
            return;
        }

        // Try to load saved location from localStorage
        const savedLocation = localStorage.getItem("user_location");
        if (savedLocation) {
            try {
                setLocation(JSON.parse(savedLocation));
            } catch (e) {
                console.error("Error parsing saved location:", e);
            }
        }

        // Try to load saved delivery method from localStorage
        const savedDeliveryMethod = localStorage.getItem("delivery_method");
        if (savedDeliveryMethod) {
            setDeliveryMethod(savedDeliveryMethod);
        }

        loadMeals();
    }, [navigate])

    const loadMeals = async () => {
        try {
            setLoading(true)
            const token = localStorage.getItem("auth_token");
            if (!token) {
                throw new Error("Authentication token not found");
            }
            
            let response;
            
            // If we have a location, use the nearby endpoint
            if (location) {
                response = await fetchNearbyMeals(
                    location.formatted_address,
                    5.0, // 5km radius
                    { 
                        is_available: true,
                        limit: 10
                    }, 
                    token
                );
            } else {
                // Otherwise use the regular endpoint
                response = await fetchMeals({ 
                    is_available: true,
                    limit: 10
                }, token);
            }
            
            setMeals(response.meals)
            setError(null)
        } catch (err) {
            console.error("Failed to load meals:", err)
            setError("Failed to load meals. Please try again.")
            
            // If error is related to authentication, redirect to login
            if (!isAuthenticated()) {
                navigate("/intro/getstarted");
            }
        } finally {
            setLoading(false)
        }
    }

    const handleMealClick = (mealId: string) => {
        navigate(`/dashboard/meal/${mealId}`)
    }

    const handleLocationSelected = (newLocation: Location) => {
        setLocation(newLocation);
        localStorage.setItem("user_location", JSON.stringify(newLocation));
        
        // After setting location, reload meals
        loadMeals();
    }

    const handleDeliveryMethodChange = (method: string) => {
        setDeliveryMethod(method);
        localStorage.setItem("delivery_method", method);
    }

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen text-[#FF6B00]">
            <div className="px-4 py-6 pb-20">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-4">Discover Meals</h1>

                {/* Location and Filter Section */}
                <div className="mb-6">
                    {location ? (
                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    <span className="text-sm truncate max-w-[200px]">
                                        {location.formatted_address}
                                    </span>
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setShowLocationPicker(!showLocationPicker)}
                                >
                                    {showLocationPicker ? "Hide" : "Change"}
                                </Button>
                            </div>
                            
                            {!showLocationPicker && (
                                <div className="mb-4">
                                    <LocationMap location={location} height="150px" />
                                </div>
                            )}
                            
                            <div className="flex gap-2 mb-2">
                                <div 
                                    className={`flex-1 text-center py-1 px-2 rounded-full text-xs cursor-pointer ${
                                        deliveryMethod === "pickup" 
                                            ? "bg-[#FF6B00] text-white" 
                                            : "border border-[#FF6B00] text-[#FF6B00]"
                                    }`}
                                    onClick={() => handleDeliveryMethodChange("pickup")}
                                >
                                    Pickup
                                </div>
                                <div 
                                    className={`flex-1 text-center py-1 px-2 rounded-full text-xs cursor-pointer ${
                                        deliveryMethod === "delivery" 
                                            ? "bg-[#FF6B00] text-white" 
                                            : "border border-[#FF6B00] text-[#FF6B00]"
                                    }`}
                                    onClick={() => handleDeliveryMethodChange("delivery")}
                                >
                                    Delivery
                                </div>
                                <div 
                                    className={`flex-1 text-center py-1 px-2 rounded-full text-xs cursor-pointer ${
                                        deliveryMethod === "flexible" 
                                            ? "bg-[#FF6B00] text-white" 
                                            : "border border-[#FF6B00] text-[#FF6B00]"
                                    }`}
                                    onClick={() => handleDeliveryMethodChange("flexible")}
                                >
                                    Flexible
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Button 
                            className="w-full mb-4"
                            onClick={() => setShowLocationPicker(true)}
                        >
                            Set Your Location
                        </Button>
                    )}
                    
                    {showLocationPicker && (
                        <div className="mb-4">
                            <LocationPicker
                                initialLocation={location || undefined}
                                onLocationSelected={handleLocationSelected}
                                deliveryMethod={deliveryMethod}
                                onDeliveryMethodChange={handleDeliveryMethodChange}
                            />
                            <Button 
                                className="w-full mt-4"
                                onClick={() => {
                                    setShowLocationPicker(false);
                                    loadMeals();
                                }}
                            >
                                Apply Filters
                            </Button>
                        </div>
                    )}
                </div>

                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search here"
                        className="pl-9 bg-gray-50 border-gray-200"
                        onClick={() => setIsSearchOpen(true)}
                    />
                </div>

                {/* Recipe Cards */}
                <div className="space-y-10">
                    {loading ? (
                        // Loading skeletons
                        Array(3).fill(0).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <Skeleton className="h-6 w-40" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-64 w-full rounded-lg" />
                            </div>
                        ))
                    ) : error ? (
                        // Error message
                        <div className="text-center py-10">
                            <p className="text-red-500 mb-2">{error}</p>
                            <button 
                                onClick={() => loadMeals()}
                                className="text-sm underline"
                            >
                                Try again
                            </button>
                        </div>
                    ) : meals.length === 0 ? (
                        // No meals found
                        <div className="text-center py-10">
                            <p className="text-gray-500">No meals available right now.</p>
                            <p className="text-sm mt-2">Check back later or create your own meal!</p>
                        </div>
                    ) : (
                        // Meal cards
                        meals.map((meal) => (
                            <div 
                                key={meal.id} 
                                className="space-y-2 cursor-pointer"
                                onClick={() => handleMealClick(meal.id)}
                            >
                                <h2 className="font-bold">{meal.title}</h2>
                                <p className="text-sm font-bold">by {meal.user_name || "Anonymous"}</p>
                                <div className="relative aspect-square rounded-lg overflow-hidden">
                                    <img
                                        src={meal.image_url || "https://placehold.co/600x400?text=No+Image"}
                                        alt={meal.title}
                                        className="object-cover w-full h-full"
                                    />
                                    {meal.delivery_method && (
                                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                                            {meal.delivery_method === "pickup" ? "Pickup Only" : 
                                             meal.delivery_method === "delivery" ? "Delivery Only" : "Flexible"}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        </div>
    )
}

