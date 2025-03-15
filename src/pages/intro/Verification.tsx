"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";

export default function Verification() {
    const navigate = useNavigate();
    const [code, setCode] = useState("");

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white">
                        We have sent you a verification code!
                    </h1>
                    <div>
                        <FloatingLabelInputSmall
                            label="Enter your code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />

                        <h1 className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer">
                            Click here to resend
                        </h1>

                    </div>
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                        onClick={() => console.log("Continue clicked")}
                    >
                        CONTINUE
                    </Button>


                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white"
                            onClick={() => navigate("/intro/uniemail")}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
