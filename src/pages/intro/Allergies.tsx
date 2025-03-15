"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";

export default function Allergies() {
    const navigate = useNavigate();
    const [allergies, setAllergies] = useState("");
    const [hasNoAllergies, setHasNoAllergies] = useState(false);

    const handleNoAllergies = () => {
        setHasNoAllergies(true);
        setAllergies("None");
        localStorage.setItem("user_allergies", "None");
    };

    const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAllergies(e.target.value);
        setHasNoAllergies(false);
        if (e.target.value) {
            localStorage.setItem("user_allergies", e.target.value);
        }
    };

    const handleContinue = () => {
        // Save allergies to localStorage if not already saved
        if (allergies && !hasNoAllergies) {
            localStorage.setItem("user_allergies", allergies);
        }
        navigate("/intro/purpose");
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white">
                        Any food allergies?
                    </h1>
                    <div>
                        <FloatingLabelInputSmall
                            label="List your allergies here if any"
                            value={allergies}
                            onChange={handleAllergiesChange}
                            disabled={hasNoAllergies}
                        />

                        <h1 
                            className="font-montserrat underline text-[15px] mt-2 font-semibold cursor-pointer"
                            onClick={handleNoAllergies}
                        >
                            Don't have any? Click here
                        </h1>

                    </div>
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
                        onClick={handleContinue}
                        disabled={!allergies && !hasNoAllergies}
                    >
                        CONTINUE
                    </Button>


                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                            onClick={() => navigate("/intro/dietary")}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
