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
  const [errors, setErrors] = useState<{firstName?: string; lastName?: string}>({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: {firstName?: string; lastName?: string} = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      // Store the name in localStorage for later use during registration
      localStorage.setItem("user_first_name", firstName);
      localStorage.setItem("user_last_name", lastName);
      navigate("/intro/tellusmore");
    }
  };

  return (
    <Center>
      <div className="bg-[#f57600] p-6">
        <div className="mx-auto max-w-md space-y-8">
          <h1 className="font-montagu-slab text-[32px] font-bold text-white">
            Enter your name
          </h1>
          <div className="space-y-6">
            <div>
              <FloatingLabelInput
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && (
                <p className="text-white text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            
            <div>
              <FloatingLabelInput
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && (
                <p className="text-white text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <p className="font-montserrat text-center text-[16px] font-bold">
              you will not be able to change this.
            </p>

            <Button
              className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
              onClick={handleContinue}
            >
              CONTINUE
            </Button>
          </div>

          <div className="fixed bottom-6 left-6">
            <Button
              size="icon"
              className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
              onClick={() => navigate("/intro/getstarted")}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </Center>
  );
}
