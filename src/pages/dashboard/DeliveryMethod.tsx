"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from "react-router"
import MobileNav from "./MobileNav"
import { createFood } from "@/api/food"

interface MealFormData {
    type: 'post' | 'request';
    title: string;
    description: string;
    imageUrl?: string;
    referenceId?: string;
    selectedDate?: string;
    selectedTime?: string;
}

export default function DeliveryMethod() {
    const navigate = useNavigate();
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const [formData, setFormData] = useState<MealFormData | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    // Load form data from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('meal_form_data');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setFormData(parsedData);
            } catch (e) {
                console.error('Error parsing stored form data:', e);
            }
        } else {
            // If no data, go back to form
            navigate('/dashboard/mealform');
        }
    }, [navigate]);

    const handleSubmit = async () => {
        if (!selectedMethod || !formData) return;
        
        try {
            setIsSubmitting(true);
            setError(null);
            
            // Get auth token
            const token = localStorage.getItem("auth_token");
            if (!token) {
                setError("Authentication required. Please log in again.");
                navigate("/intro/login");
                return;
            }
            
            // Prepare data for API
            const foodData = {
                title: formData.title,
                description: formData.description,
                category: "meal", // Default category
                food_type: formData.type === 'post' ? "offering" : "request",
                dietary_requirements: [], // This would come from user profile or form
                allergens: "", // This would come from user profile or form
                expiry_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
                location: "", // This would come from user profile
                is_homemade: true,
                is_available: true,
                pickup_times: formData.selectedTime ? [formData.selectedTime] : [],
                tickets_required: 1,
                image_url: formData.imageUrl || "",
                delivery_method: selectedMethod
            };
            
            // Submit to API
            const response = await createFood(foodData, token);
            
            if (response.error) {
                setError(response.error.detail || "Failed to create food listing");
                return;
            }
            
            // Clear form data from localStorage
            localStorage.removeItem('meal_form_data');
            
            // Navigate to success page or dashboard
            navigate("/dashboard/discovermeal");
            
        } catch (err) {
            console.error("Error submitting form:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-white p-4">
            <div className="max-w-md mx-auto pb-20">
                <div className="mb-6 flex items-center">
                    <ArrowLeft 
                        className="h-6 w-6 text-[#FF6B00] cursor-pointer" 
                        onClick={() => navigate("/dashboard/timeselector")} 
                    />
                    <h1 className="ml-4 text-2xl font-semibold text-[#FF6B00]">Delivery Method</h1>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <div className="space-y-4 mb-8">
                    <div
                        className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${selectedMethod === "pickup"
                            ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                            : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                            }`}
                        onClick={() => setSelectedMethod("pickup")}
                    >
                        Pickup Only
                    </div>

                    <div
                        className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${selectedMethod === "delivery"
                            ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                            : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                            }`}
                        onClick={() => setSelectedMethod("delivery")}
                    >
                        Delivery Only
                    </div>

                    <div
                        className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg flex items-center ${selectedMethod === "flexible"
                            ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                            : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                            }`}
                        onClick={() => setSelectedMethod("flexible")}
                    >
                        Flexible
                    </div>
                </div>

                {/* Submit Button */}
                <Button 
                    className="w-full h-14 text-lg bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white"
                    onClick={handleSubmit}
                    disabled={!selectedMethod || isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : formData?.type === 'post' ? "Post Meal" : "Submit Request"}
                </Button>
            </div>
            
            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    )
}

