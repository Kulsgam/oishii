"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";
import { registerUser, loginUser } from "@/api/users";
import { RegisterUserRequest, LoginRequest } from "@/api/types";
import { storeAuthToken } from "@/utils/auth";

export default function UniEmail() {
    const navigate = useNavigate();
    const [uniEmail, setUniEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Check if all required fields are present when the component loads
    useEffect(() => {
        const requiredFields = [
            { key: "user_first_name", label: "First Name" },
            { key: "user_last_name", label: "Last Name" },
            { key: "user_bio", label: "Bio" },
            { key: "user_cook_type", label: "Cook Type" },
            { key: "user_cook_frequency", label: "Cook Frequency" },
            { key: "user_allergies", label: "Allergies" },
            { key: "user_purpose", label: "Purpose" },
            { key: "user_home_address", label: "Home Address" }
        ];

        const missingFields = requiredFields.filter(field => 
            !localStorage.getItem(field.key)
        );

        if (missingFields.length > 0) {
            // If any required field is missing, redirect to the GetStarted page
            navigate("/intro/getstarted");
        }
    }, [navigate]);

    const validateEmail = (email: string) => {
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return "Please enter a valid email address";
        }
        
        // Check for specific university email domains
        const allowedDomains = [
            'rmit.edu.au',
            'student.rmit.edu.au',
            'monash.edu',
            'student.monash.edu',
            'unimelb.edu.au',
            'student.unimelb.edu.au'
        ];
        
        const isAllowedDomain = allowedDomains.some(domain => 
            email.toLowerCase().endsWith('@' + domain)
        );
        
        if (!isAllowedDomain) {
            return "Please use an email from RMIT, Monash, or University of Melbourne";
        }
        
        return null;
    };

    const validateRequiredFields = () => {
        const requiredFields = [
            { key: "user_first_name", label: "First Name" },
            { key: "user_last_name", label: "Last Name" },
            { key: "user_bio", label: "Bio" },
            { key: "user_cook_type", label: "Cook Type" },
            { key: "user_cook_frequency", label: "Cook Frequency" },
            { key: "user_allergies", label: "Allergies" },
            { key: "user_purpose", label: "Purpose" },
            { key: "user_home_address", label: "Home Address" }
        ];

        const missingFields = requiredFields.filter(field => 
            !localStorage.getItem(field.key)
        );

        if (missingFields.length > 0) {
            return `Missing required fields: ${missingFields.map(f => f.label).join(", ")}`;
        }

        return null;
    };

    const handleContinue = async () => {
        // Reset error
        setError(null);
        
        // Validate email
        const emailError = validateEmail(uniEmail);
        if (emailError) {
            setError(emailError);
            return;
        }
        
        // Validate password
        if (!password || password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }

        // Validate all required fields are present
        const fieldsError = validateRequiredFields();
        if (fieldsError) {
            setError(fieldsError);
            return;
        }
        
        try {
            setIsLoading(true);
            
            // Get all user data from localStorage
            const firstName = localStorage.getItem("user_first_name") || "";
            const lastName = localStorage.getItem("user_last_name") || "";
            const bio = localStorage.getItem("user_bio") || "";
            const cookType = localStorage.getItem("user_cook_type") || "";
            const cookFrequency = localStorage.getItem("user_cook_frequency") || "";
            const allergies = localStorage.getItem("user_allergies") || "";
            const purpose = localStorage.getItem("user_purpose") || "";
            const homeAddress = localStorage.getItem("user_home_address") || "";
            
            // Get dietary requirements (stored as JSON string)
            const dietaryRequirementsStr = localStorage.getItem("user_dietary_requirements");
            const dietaryRequirements = dietaryRequirementsStr 
                ? JSON.parse(dietaryRequirementsStr) 
                : [];
            
            // Create the complete user registration request
            const userData: RegisterUserRequest = {
                email: uniEmail,
                first_name: firstName,
                last_name: lastName,
                bio: bio,
                cook_type: cookType,
                cook_frequency: cookFrequency,
                dietary_requirements: dietaryRequirements,
                allergies: allergies,
                purpose: purpose,
                home_address: homeAddress,
                is_verified: false,
                password: password
            };
            
            // Register the user with complete data
            const response = await registerUser(userData);
            
            if (response.error) {
                setError(typeof response.error.detail === 'string' 
                    ? response.error.detail 
                    : "Registration failed. Please check all fields and try again.");
                return;
            }
            
            console.log("Registration successful:", response.data);
            
            // Store email for verification page
            localStorage.setItem("user_email", uniEmail);
            
            // Temporarily store password for potential re-login during verification
            // This will be removed after verification is complete
            localStorage.setItem("user_password", password);
            
            // Automatically log in the user after successful registration
            const loginResponse = await loginUser({
                username: uniEmail,
                password: password
            });
            
            console.log("Auto-login response:", loginResponse);
            
            if (loginResponse.error) {
                console.error("Auto-login failed:", loginResponse.error);
                // Even if login fails, we still proceed to verification
                // since registration was successful
            } else if (loginResponse.data) {
                // Store the auth token
                storeAuthToken(loginResponse.data.access_token);
                console.log("Auth token stored:", loginResponse.data.access_token);
            }
            
            // Navigate to verification page
            navigate("/intro/verification");
        } catch (err) {
            console.error("Registration error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white">
                        Please enter your university email
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <FloatingLabelInputSmall
                                label="University Email"
                                value={uniEmail}
                                onChange={(e) => setUniEmail(e.target.value)}
                                type="email"
                            />
                            <p className="text-white text-xs mt-1">
                                Use your email from RMIT, Monash, or University of Melbourne
                            </p>
                        </div>
                        
                        <div>
                            <FloatingLabelInputSmall
                                label="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                        </div>

                        {error && (
                            <p className="text-white text-sm mt-1 bg-red-500/20 p-2 rounded">{error}</p>
                        )}

                        <h1 className="font-montserrat text-[15px] mt-2 font-semibold">
                            We will send you a verification email
                        </h1>
                        
                        <p className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer" onClick={() => navigate("/intro/login")}>
                            Already have an account? Login
                        </p>
                    </div>
                    
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
                        onClick={handleContinue}
                        disabled={isLoading}
                    >
                        {isLoading ? "REGISTERING..." : "CONTINUE"}
                    </Button>

                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                            onClick={() => navigate("/intro/homeaddress")}
                            disabled={isLoading}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
