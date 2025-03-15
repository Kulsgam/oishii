"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";

export default function NameForm() {
    const [uniEmail, setUniEmail] = useState("");

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white">
                        Please enter your university email
                    </h1>
                    <div>
                        <FloatingLabelInputSmall
                            label="University Email"
                            value={uniEmail}
                            onChange={(e) => setUniEmail(e.target.value)}
                        />

                        <h1 className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer">
                            We will send you a verification email
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
                            onClick={() => console.log("Back clicked")}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
