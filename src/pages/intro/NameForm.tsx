"use client";

import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInput } from "@/components/FloatingLabelInput";

export default function NameForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();


  return (
    <Center>
      <div className="bg-[#f57600] p-6">
        <div className="mx-auto max-w-md space-y-8">
          <h1 className="font-montagu-slab text-[32px] font-bold text-white">
            Enter your name
          </h1>
          <div className="space-y-6">
            <FloatingLabelInput
              label="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <FloatingLabelInput
              label="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <p className="font-montserrat text-center text-[16px] font-bold">
              you will not be able to change this.
            </p>

            <Button
              className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
              onClick={() => navigate("/intro/tellusmore")}
            >
              CONTINUE
            </Button>
          </div>

          <div className="fixed bottom-6 left-6">
            <Button
              size="icon"
              className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
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
