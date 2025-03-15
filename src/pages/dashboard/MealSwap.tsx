import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router"

export default function MealSwap() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white text-[#FF6B00] p-4">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="mb-8" onClick={() => navigate("/dashboard/discovermeal")}>
                    <ArrowLeft className="w-6 h-6 " />
                </div>

                {/* Title */}
                <h1 className="text-3xl font-bold mb-8">Meal Swap</h1>

                {/* Subtitle */}
                <p className="text-lg font-semibold mb-2">Select a Post or a Request</p>

                {/* Action Buttons */}
                <div className="space-y-4 mb-8">
                    <div className="w-full h-fit bg-[#FF6B00] hover:bg-[#FF6B00]/80 text-white text-left p-6 rounded-xl cursor-pointer">
                        <div className="font-bold text-xl mb-1">Post</div>
                        <div className="text-sm">
                            Cooked too much?
                            <br />
                            Put it up for a Mealswap!
                        </div>
                    </div>

                    <div
                        className="w-full h-fit border-3 border-[#FF6B00] text-[#8e4b1b] hover:bg-[#FF6B00]/30 hover:text-black text-left p-6 cursor-pointer rounded-xl"
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
                </div>

                {/* Continue Button */}
                <Button
                    className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white cursor-pointer"
                    onClick={() => navigate("/dashboard/mealform")}
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}

