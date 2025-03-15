"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function DeliveryMethod() {
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white p-4 max-w-md mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <ArrowLeft className="h-6 w-6 text-[#FF6B00] cursor-pointer" onClick={() => navigate("/dashboard/timeselector")} />
                <h1 className="text-2xl font-bold text-[#FF6B00]">Delivery Method</h1>
            </div>

            {/* Subtitle */}
            <p className="text-[#FF6B00] mb-4">How would you like your meal to be delivered?</p>

            {/* Address Input */}
            <Input
                placeholder="581 Swanston St, Carlton VIC 3053"
                className="mb-4 border-[#FF6B00] focus-visible:ring-[#FF6B00]"
            />

            {/* Delivery Options */}
            <div className="space-y-4 mb-8">
                <div
                    className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg ${selectedMethod === "pickup"
                        ? "bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                        : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                        }`}
                    onClick={() => setSelectedMethod("pickup")}
                >
                    Pickup Only
                </div>

                <div
                    className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg ${selectedMethod === "delivery"
                        ? "bg-[#FF6B00] text-white hover:bg-[#FF6B00]/90"
                        : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                        }`}
                    onClick={() => setSelectedMethod("delivery")}
                >
                    Delivery Only
                </div>

                <div
                    className={`cursor-pointer border rounded-lg p-4 w-full h-14 text-lg ${selectedMethod === "flexible"
                        ? "bg-[#FF6B00] hover:bg-[#FF6B00]/90"
                        : "border-[#FF6B00] text-[#FF6B00] hover:bg-[#FF6B00]/10"
                        }`}
                    onClick={() => setSelectedMethod("flexible")}
                >
                    Flexible
                </div>
            </div>

            {/* Post Meal Button */}
            <Button className="cursor-pointer w-full h-14 text-lg bg-[#FF6B00] hover:bg-[#FF6B00]/90">Post Meal</Button>
        </div>
    )
}

