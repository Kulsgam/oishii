"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { useNavigate } from "react-router";

export default function HowOftenCook() {
    const navigate = useNavigate();
    const [selected, setSelected] = useState<string | null>(null);

    const handleSelect = (option: string) => {
        setSelected(option);
        // Store the selection in localStorage for later use
        localStorage.setItem("user_cook_frequency", option);
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white pb-4">
                        How often do you cook per week?
                    </h1>
                    <div className="flex flex-col gap-y-4 mb-8">
                        <div 
                            className="flex gap-x-4 cursor-pointer" 
                            onClick={() => handleSelect("1-2 times")}
                        >
                            <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === "1-2 times" ? "bg-white" : ""}`}>
                                {selected === "1-2 times" && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">1-2 times</h1>
                        </div>
                        <div 
                            className="flex gap-x-4 cursor-pointer" 
                            onClick={() => handleSelect("3-4 times")}
                        >
                            <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === "3-4 times" ? "bg-white" : ""}`}>
                                {selected === "3-4 times" && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">3-4 times</h1>
                        </div>
                        <div 
                            className="flex gap-x-4 cursor-pointer" 
                            onClick={() => handleSelect("5-7 times")}
                        >
                            <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === "5-7 times" ? "bg-white" : ""}`}>
                                {selected === "5-7 times" && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">5-7 times</h1>
                        </div>
                        <div 
                            className="flex gap-x-4 cursor-pointer" 
                            onClick={() => handleSelect("more than 7 times")}
                        >
                            <div className={`border-4 rounded-full border-white h-8 w-8 flex items-center justify-center ${selected === "more than 7 times" ? "bg-white" : ""}`}>
                                {selected === "more than 7 times" && <div className="bg-[#f57600] h-3 w-3 rounded-full"></div>}
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">more than 7 times</h1>
                        </div>
                    </div>

                </div>

                <Button
                    className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                    onClick={() => navigate("/intro/dietary")}
                    disabled={!selected}
                >
                    CONTINUE
                </Button>
                <div className="fixed bottom-6 left-6">
                    <Button
                        size="icon"
                        className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                        onClick={() => navigate("/intro/cooktype")}
                    >
                        <ArrowLeft className="h-6 w-6" />
                    </Button>
                </div>
            </div>
        </Center >
    );
}
