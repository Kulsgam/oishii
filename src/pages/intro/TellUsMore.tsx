"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";

export default function NameForm() {

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

                    <Button
                        className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                        onClick={() => console.log("Continue clicked")}
                    >
                        CONTINUE
                    </Button>
                    <p className="font-montserrat text-center text-[16px] font-bold cursor-pointer">
                        I'll skip for now
                    </p>

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
