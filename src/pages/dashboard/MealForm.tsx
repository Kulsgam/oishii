"use client"

import type React from "react"

import { ArrowLeft, Plus } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useNavigate, useLocation } from "react-router"
import MobileNav from "./MobileNav"
import WebcamCapture from "../test"

export default function MealForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState<string>("")
    const [isUploading, setIsUploading] = useState(false)
    const [formType, setFormType] = useState<'post' | 'request' | 'share'>('post')
    const [referenceId, setReferenceId] = useState<string | null>(null)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // Parse query parameters
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const type = queryParams.get('type');
        const reference = queryParams.get('reference');

        if (type === 'post' || type === 'request' || type === "share") {
            setFormType(type);
        } else {
            // Check localStorage as fallback
            const storedType = localStorage.getItem('meal_form_type');
            if (storedType === 'post' || storedType === 'request' || storedType === "share") {
                setFormType(storedType);
            }
        }

        if (reference) {
            setReferenceId(reference);
            // TODO: Fetch meal details if we have a reference ID
        }
    }, [location.search]);

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

    const handleContinue = () => {
        // Store form data in localStorage for the next steps
        localStorage.setItem('meal_form_data', JSON.stringify({
            type: formType,
            title,
            description,
            imageUrl,
            referenceId
        }));

        navigate("/dashboard/timeselector");
    }

    return (
        <div className="min-h-screen bg-white p-4">
            {/* Header */}
            <div className="mb-6 flex items-center">
                <ArrowLeft className="h-6 w-6 text-[#FF6B00] cursor-pointer" onClick={() => navigate("/dashboard/mealswap")} />
                <h1 className="ml-4 text-2xl font-semibold text-[#FF6B00]">
                    {formType === 'post' ? 'Describe Your Meal' : formType === 'request' ? 'Request a Meal' : 'Share Ingredients'}
                </h1>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleContinue(); }}>
                <Input
                    placeholder={formType === 'post' ? "Insert Meal Name" : formType === 'request' ? "What meal are you looking for?" : "Ingredient name"}
                    className="border-[#FF6B00] border-opacity-50"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                {formType === 'post' && (
                    /* Image Upload Area - only for posts */
                    <div className="relative aspect-square w-full">
                        <label
                            className={`flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed
                  ${imageUrl ? "border-transparent" : "border-[#FF6B00] border-opacity-50"}`}
                        >
                            {imageUrl ? (
                                <img src={imageUrl} alt="Meal preview" className="h-full w-full rounded-lg object-cover" />
                            ) : (
                                <div className="flex flex-col items-center justify-center">
                                    <Plus className="h-8 w-8 text-[#FF6B00]" />
                                    <span className="mt-2 text-sm text-[#FF6B00]">Add A Picture</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                    </div>
                )}

                <div>
                    <Label htmlFor="meal-description">
                        {formType === 'post' ? 'Meal Description' : 'Request Details'}
                    </Label>
                    <Textarea
                        id="meal-description"
                        placeholder={formType === 'post'
                            ? "Describe your meal, ingredients, etc."
                            : formType === 'request' ? "Describe what you're looking for, any dietary requirements, etc."
                                : "Ingredient description"
                        }
                        className="min-h-[100px] border-[#FF6B00] border-opacity-50 mt-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                {
                    formType === 'share' && (
                        <div>
                            <h1 className="text-[#FF6B00] text-xl text-bold">Take a picture of your ingredients</h1>
                            <div className="rounded-xl border-2">
                                <WebcamCapture />
                            </div>

                        </div>
                    )
                }

                <Button
                    type="submit"
                    className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 cursor-pointer text-white"
                    disabled={!title.trim() || !description.trim()}
                >
                    Continue
                </Button>
            </form>

            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    )
}

