"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";

export default function Dietary() {

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white pb-4">
                        Any dietary requirements?
                    </h1>
                    <div className="flex flex-col gap-y-4 mb-8">
                        <div className="flex gap-x-4">
                            <div className="border-4 rounded-full border-white h-8 w-8">
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">Vegetarian</h1>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="border-4 rounded-full border-white h-8 w-8">
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">Vegan</h1>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="border-4 rounded-full border-white h-8 w-8">
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">Halal</h1>
                        </div>
                        <div className="flex gap-x-4">
                            <div className="border-4 rounded-full border-white h-8 w-8">
                            </div>
                            <h1 className="font-montserrat text-center text-[20px] font-bold">None</h1>
                        </div>
                    </div>

                </div>

                <Button
                    className="cursor-pointer font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                    onClick={() => console.log("Continue clicked")}
                >
                    CONTINUE
                </Button>
                <h1 className="font-montserrat text-center underline text-[20px] font-bold mt-4 cursor-pointer">Don't see yours? Click here for more</h1>

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
        </Center >
    );
}
