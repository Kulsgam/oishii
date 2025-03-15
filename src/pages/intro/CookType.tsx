"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { useNavigate } from "react-router";

export default function CookType() {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string | null>(null);

    const cookTypes = [
        "the meal prepper",
        "the daily fresh cook",
        "the one-big-batch cook",
        "the non-cook"
    ];

    const displayNames = {
        "the meal prepper": "The Meal Prepper",
        "the daily fresh cook": "The Daily Fresh Cook",
        "the one-big-batch cook": "The One-Big-Batch Cook",
        "the non-cook": "The Non Cook"
    };

    const handleContinue = () => {
        if (selectedType) {
            localStorage.setItem("user_cook_type", selectedType);
            navigate("/intro/howoftencook");
        }
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white pb-4">
                        What type of cook are you?
                    </h1>
                    <div className="flex flex-col gap-y-4 mb-8">
                        {cookTypes.map((type) => (
                            <label key={type} className="flex gap-x-4 cursor-pointer">
                                <div 
                                    className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${
                                        selectedType === type ? "bg-white" : ""
                                    }`}
                                    onClick={() => setSelectedType(type)}
                                >
                                    {selectedType === type && (
                                        <div className="bg-[#f57600] rounded-full h-3 w-3" />
                                    )}
                                </div>
                                <h1 className="font-montserrat text-center text-[20px] font-bold">
                                    {displayNames[type]}
                                </h1>
                            </label>
                        ))}
                    </div>

                </div>

                <Button
                    className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                    onClick={handleContinue}
                    disabled={!selectedType}
                >
                    CONTINUE
                </Button>
                <div className="fixed bottom-6 left-6">
                    <Button
                        size="icon"
                        className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                        onClick={() => navigate("/intro/tellusmore")}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </Center >
    );
}
