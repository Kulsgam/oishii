import { Search } from "lucide-react"
// import Image from "next/image"
import { Input } from "@/components/ui/input"
import MobileNav from "./MobileNav"
import { SearchOverlay } from "./SearchOverlay"
import { useState } from "react"
import SlowCookedPork from "/slow-cooked-pork.png"
import AglioOlio from "/aglio-olio.png"

export default function DiscoverMeals() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <div className="max-w-md mx-auto bg-white min-h-screen text-[#FF6B00]">
            <div className="px-4 py-6">
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
                    <div className="space-y-2">
                        <h2 className="font-bold">Slow-Cooked Pork</h2>
                        <p className="text-sm font-bold">by Nicholas</p>
                        <div className="relative rounded-lg overflow-hidden">
                            <img
                                src={SlowCookedPork}
                                alt="Slow-Cooked Pork"
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-bold">Aglio Olio</h2>
                        <p className="text-sm font-bold">by Tiffany</p>
                        <div className="relative aspect-square rounded-lg overflow-hidden">
                            <img
                                src={AglioOlio}
                                alt="Aglio Olio"
                                className="object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />

            <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        </div>
    )
}

