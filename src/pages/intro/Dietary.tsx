"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { useNavigate } from "react-router";

export default function Dietary() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);

    const dietaryOptions = [
        { value: "vegetarian", display: "Vegetarian" },
        { value: "vegan", display: "Vegan" },
        { value: "halal", display: "Halal" },
        { value: "none", display: "None" }
    ];

    const handleSelect = (option: string) => {
        setSelected(option);
        // Store the selection in localStorage for later use
        localStorage.setItem("user_dietary_requirements", JSON.stringify([option]));
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white pb-4">
                        Any dietary requirements?
                    </h1>
                    <div className="flex flex-col gap-y-4 mb-8">
                        {dietaryOptions.map((option) => (
                            <div 
                                key={option.value}
                                className="flex gap-x-4 cursor-pointer" 
                                onClick={() => handleSelect(option.value)}
                            >
                                <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === option.value ? "bg-white" : ""}`}>
                                    {selected === option.value && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                                </div>
                                <h1 className="font-montserrat text-center text-[20px] font-bold">{option.display}</h1>
                            </div>
                        ))}
                    </div>

                </div>

                <Button
                    className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                    onClick={() => navigate("/intro/allergies")}
                    disabled={!selected}
                >
                    CONTINUE
                </Button>
                <h1 
                    className="font-montserrat text-center underline text-[20px] font-bold mt-4 cursor-pointer"
                    onClick={() => {
                        // You can implement a modal or additional input for custom dietary requirements
                        const custom = prompt("Please enter your dietary requirement:");
                        if (custom && custom.trim() !== "") {
                            // Convert to lowercase for consistency with backend
                            handleSelect(custom.trim().toLowerCase());
                        }
                    }}
                >
                    Don't see yours? Click here for more
                </h1>

                <div className="fixed bottom-6 left-6">
                    <Button
                        size="icon"
                        className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                        onClick={() => navigate("/intro/howoftencook")}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </Center >
    );
}
