import { Search } from "lucide-react"
// import Image from "next/image"
import { Input } from "@/components/ui/input"
import MobileNav from "./MobileNav"
import { SearchOverlay } from "./SearchOverlay"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { fetchMeals, Meal } from "@/api/meals"
import { Skeleton } from "@/components/ui/skeleton"
import { redirectIfUnauthenticated, isAuthenticated } from "@/utils/auth"

export default function DiscoverMeals() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [meals, setMeals] = useState<Meal[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        // Check if user is authenticated
        if (redirectIfUnauthenticated(navigate)) {
            return;
        }

        const loadMeals = async () => {
            try {
                setLoading(true)
                const token = localStorage.getItem("auth_token");
                if (!token) {
                    throw new Error("Authentication token not found");
                }
                
                const response = await fetchMeals({ 
                    is_available: true,
                    limit: 10
                }, token) // Pass the token to the API call
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

        loadMeals()
    }, [navigate])

    const handleMealClick = (mealId: string) => {
        navigate(`/dashboard/meal/${mealId}`)
    }

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen text-[#FF6B00]">
            <div className="px-4 py-6 pb-20">
                {/* Header */}
                <h1 className="text-2xl font-bold mb-4">Discover Meals</h1>

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
                                onClick={() => window.location.reload()}
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

