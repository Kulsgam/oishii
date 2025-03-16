"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { useNavigate } from "react-router";

export default function Purpose() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);

    const purposes = [
        "save on food expenses",
        "eat healthier meals",
        "try out new dishes",
        "make new friends"
    ];

    const handleSelect = (purpose: string) => {
        setSelected(purpose);
        localStorage.setItem("user_purpose", purpose);
    };

    const handleContinue = () => {
        if (selected) {
            navigate("/intro/homeaddress");
        }
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white pb-4">
                        What is your main purpose here?
                    </h1>
                    <div className="flex flex-col gap-y-4 mb-8">
                        {purposes.map((purpose) => (
                            <div 
                                key={purpose}
                                className="flex gap-x-4 cursor-pointer" 
                                onClick={() => handleSelect(purpose)}
                            >
                                <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === purpose ? "bg-white" : ""}`}>
                                    {selected === purpose && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                                </div>
                                <h1 className="font-montserrat text-center text-[20px] font-bold">
                                    {purpose === "try out new dishes" ? "try out new dishes" : `to ${purpose}`}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>

                <Button
                    className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                    onClick={handleContinue}
                    disabled={!selected}
                >
                    CONTINUE
                </Button>

                <div className="fixed bottom-6 left-6">
                    <Button
                        size="icon"
                        className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                        onClick={() => navigate("/intro/allergies")}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </Center>
    );
}
