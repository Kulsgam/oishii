"use client";

import { useEffect } from "react";
import Center from "@/components/Center";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function Welcome() {
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
            Welcome to Oishii
          </h1>
          <p className="font-montserrat text-[16px] font-bold text-white">
            The meal swapping app for university students
          </p>
          
          <div className="space-y-4">
            <Button
              className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
              onClick={() => navigate("/intro/getstarted")}
            >
              GET STARTED
            </Button>
            
            <Button
              className="font-montserrat h-[40px] w-full rounded-[20px] bg-transparent border-2 border-white text-[15px] text-white hover:bg-white/10 cursor-pointer"
              onClick={() => navigate("/intro/login")}
            >
              LOGIN
            </Button>
          </div>
        </div>
      </div>
    </Center>
  );
} 