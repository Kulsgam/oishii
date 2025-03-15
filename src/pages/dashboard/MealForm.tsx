"use client"

import type React from "react"

import { ArrowLeft, Plus } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"

export default function MealForm() {
    const navigate = useNavigate();
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setIsUploading(true)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageUrl(reader.result as string)
                setIsUploading(false)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-white p-4">
            {/* Header */}
            <div className="mb-6 flex items-center">
                <ArrowLeft className="h-6 w-6 text-[#FF6B00] cursor-pointer" onClick={() => navigate("/dashboard/mealswap")} />
                <h1 className="ml-4 text-2xl font-semibold text-[#FF6B00]">Describe Your Meal</h1>
            </div>

            {/* Form */}
            <form className="space-y-6">
                <Input placeholder="Insert Meal Name" className="border-[#FF6B00] border-opacity-50" />

                {/* Image Upload Area */}
                <div className="relative aspect-square w-full">
                    <label
                        className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed
              ${imageUrl ? "border-transparent" : "border-[#FF6B00] border-opacity-50"}`}
                    >
                        {imageUrl ? (
                            <img src={imageUrl || "/placeholder.svg"} alt="Meal preview" className="rounded-lg object-cover" />
                        ) : (
                            <div className="flex flex-col items-center justify-center">
                                <Plus className="h-8 w-8 text-[#FF6B00]" />
                                <span className="mt-2 text-sm text-[#FF6B00]">Add A Picture</span>
                            </div>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </label>
                </div>
                <Label htmlFor="meal-description">Your message</Label>
                <Textarea name="meal-description" placeholder="Insert Meal Description" className="min-h-[100px] border-[#FF6B00] border-opacity-50" />

                <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 cursor-pointer" onClick={() => navigate("/dashboard/timeselector")} > Continue</Button>
            </form>
        </div >
    )
}

