import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate, useParams } from "react-router"
import { useState } from "react"
import MobileNav from "./MobileNav"

export default function MealSwap() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [selectedOption, setSelectedOption] = useState<'post' | 'request' | 'share' | null>(null);

    const handleOptionSelect = (option: 'post' | 'request' | 'share') => {
        setSelectedOption(option);
    };

    const handleContinue = () => {
        if (!selectedOption) return;

        // Store the selected option in localStorage
        localStorage.setItem("meal_form_type", selectedOption);

        // If we have a meal ID, it means we're responding to a specific meal
        if (id) {
            navigate(`/dashboard/mealform?type=${selectedOption}&reference=${id}`);
        } else {
            navigate(`/dashboard/mealform?type=${selectedOption}`);
        }
    };

    return (
        <div className="min-h-screen bg-white text-[#FF6B00] p-4">
            <div className="max-w-md mx-auto pb-20">
                {/* Header */}
                <div className="mb-8" onClick={() => navigate("/dashboard/discovermeal")}>
                    <ArrowLeft className="w-6 h-6 cursor-pointer" />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-8">Meal Swap</h1>

                {/* Subtitle */}
                <p className="text-lg font-semibold mb-2">Select a Post or a Request</p>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                    <div
                        className={`w-full h-fit ${selectedOption === 'post' ? 'bg-[#FF6B00]' : 'border-3 border-[#FF6B00] bg-white'} 
                            ${selectedOption === 'post' ? 'text-white' : 'text-[#8e4b1b]'} 
                            hover:bg-[#FF6B00]/80 hover:text-white text-left p-6 rounded-xl cursor-pointer`}
                        onClick={() => handleOptionSelect('post')}
                    >
                        <div className="font-bold text-xl mb-1">Post</div>
                        <div className="text-sm">
                            Cooked too much?
                            <br />
                            Put it up for a Mealswap!
                        </div>
                    </div>

                    <div
                        className={`w-full h-fit ${selectedOption === 'request' ? 'bg-[#FF6B00]' : 'border-3 border-[#FF6B00] bg-white'} 
                            ${selectedOption === 'request' ? 'text-white' : 'text-[#8e4b1b]'} 
                            hover:bg-[#FF6B00]/80 hover:text-white text-left p-6 rounded-xl cursor-pointer`}
                        onClick={() => handleOptionSelect('request')}
                    >
                        <div>
                            <div className="font-bold text-xl mb-1">Request</div>
                            <div className="text-sm">
                                Don&apos;t have food ready yet?
                                <br />
                                Put up a request!
                            </div>
                        </div>
                    </div>

                    <div
                        className={`w-full h-fit ${selectedOption === 'share' ? 'bg-[#FF6B00]' : 'border-3 border-[#FF6B00] bg-white'} 
                            ${selectedOption === 'share' ? 'text-white' : 'text-[#8e4b1b]'} 
                            hover:bg-[#FF6B00]/80 hover:text-white text-left p-6 rounded-xl cursor-pointer`}
                        onClick={() => handleOptionSelect('share')}
                    >
                        <div>
                            <div className="font-bold text-xl mb-1">Share</div>
                            <div className="text-sm">
                                Reduce food waste by sharing your ingredients with others!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Continue Button */}
                <Button
                    className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white cursor-pointer"
                    onClick={handleContinue}
                    disabled={!selectedOption}
                >
                    Continue
                </Button>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    )
}

