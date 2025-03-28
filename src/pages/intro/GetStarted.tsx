"use client";

import { useEffect } from "react";
import Center from "@/components/Center";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

export default function GetStarted() {
  const navigate = useNavigate();

  // Clear all user-related localStorage items when the page loads
  useEffect(() => {
    const userKeys = [
      "user_first_name",
      "user_last_name",
      "user_bio",
      "user_cook_type",
      "user_cook_frequency",
      "user_dietary_requirements",
      "user_allergies",
      "user_purpose",
      "user_home_address",
      "user_email",
      "user_password"
    ];
    
    userKeys.forEach(key => localStorage.removeItem(key));
  }, []);

  return (
    <Center>
      <div className="bg-[#f57600] p-6">
        <div className="mx-auto max-w-md space-y-8">
          <h1 className="font-montagu-slab text-[32px] font-bold text-white">
            Let's Create Your Profile
          </h1>
          <p className="font-montserrat text-[16px] font-bold text-white">
            We'll need some information to get you started with meal swapping
          </p>
          <Button
            className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
            onClick={() => navigate("/intro/nameform")}
          >
            START REGISTRATION
          </Button>
          
          <div className="fixed bottom-6 left-6">
            <Button
              size="icon"
              className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
              onClick={() => navigate("/intro/welcome")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </Center>
  );
}
