"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { useNavigate } from "react-router";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";

export default function TellUsMore() {
    const navigate = useNavigate();
    const [bio, setBio] = useState("");
    const [error, setError] = useState<string | null>(null);

    const validateBio = () => {
        if (!bio.trim() || bio.length < 10) {
            setError("Please enter a bio of at least 10 characters");
            return false;
        }
        setError(null);
        return true;
    };

    const handleContinue = () => {
        if (validateBio()) {
            localStorage.setItem("user_bio", bio);
            navigate("/intro/cooktype");
        }
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] text-center font-bold text-white border-b border-white pb-4">
                        Tell Us More About Yourself
                    </h1>
                    <p className="font-montserrat text-center text-[16px] font-bold">
                        this will help you find the meal you need at the right time!
                    </p>

                    <div className="space-y-4">
                        <FloatingLabelInput
                            label="Write a short bio about yourself"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            isTextArea={true}
                        />
                        {error && (
                            <p className="text-white text-sm">{error}</p>
                        )}
                        <p className="text-white text-xs">
                            Minimum 10 characters. Tell us about your cooking style, favorite foods, or anything else you'd like to share.
                        </p>
                    </div>

                    <Button
                        className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                        onClick={handleContinue}
                    >
                        CONTINUE
                    </Button>

                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                            onClick={() => navigate("/intro/nameform")}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
