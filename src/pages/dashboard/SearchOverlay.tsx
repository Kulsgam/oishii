"use client"

import { ArrowLeft, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface SearchOverlayProps {
    isOpen: boolean
    onClose: () => void
}

const recentlyViewed = [
    "Omurice",
    "Sashimi",
    "Fish and Chips",
    "Steak",
    "Salad",
    "Potatoes",
    "Porridge",
    "Dairy Free",
    "Pasta",
]

const trySearching = ["Curry", "Tempura", "Sweet and Sour Pork", "Prawn"]

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-white z-50">
            <div className="max-w-md mx-auto p-4">
                <div className="relative mb-6">
                    <ArrowLeft
                        className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground cursor-pointer"
                        onClick={onClose}
                    />
                    <Input placeholder="Search here" className="pl-9 bg-gray-50 border-gray-200" autoFocus />
                </div>

                <div className="space-y-6">
                    <div>
                        <h2 className="text-sm font-medium mb-2">Recently Viewed</h2>
                        <div className="space-y-2">
                            {recentlyViewed.map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[#FF6B00] cursor-pointer">
                                    <Search className="h-4 w-4" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-sm font-medium mb-2">Try Searching</h2>
                        <div className="space-y-2">
                            {trySearching.map((item) => (
                                <div key={item} className="flex items-center gap-2 text-[#FF6B00] cursor-pointer">
                                    <Search className="h-4 w-4" />
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

