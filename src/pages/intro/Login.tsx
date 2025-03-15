"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";
import { login, getUserProfile } from "@/api/users";
import { storeAuthToken } from "@/utils/auth";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim()) {
            setError("Please enter your email");
            return;
        }

        if (!password.trim()) {
            setError("Please enter your password");
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            // Call the login API
            const response = await login({
                username: email,
                password
            });

            if (response.error) {
                setError(response.error.detail || "Login failed. Please check your credentials and try again.");
                return;
            }

            // Store auth token
            if (response.data?.access_token) {
                storeAuthToken(response.data.access_token);
                localStorage.setItem("user_email", email);
                
                // Get user profile to check verification status
                try {
                    const userProfileResponse = await getUserProfile(response.data.access_token);
                    
                    if (userProfileResponse.data) {
                        // If user is already verified, go to dashboard
                        if (userProfileResponse.data.is_verified) {
                            navigate("/dashboard/discovermeal");
                        } else {
                            // If not verified, go to verification page
                            navigate("/intro/verification");
                        }
                    } else {
                        // Default to dashboard if we can't determine verification status
                        navigate("/dashboard/discovermeal");
                    }
                } catch (profileErr) {
                    console.error("Error fetching user profile:", profileErr);
                    // Default to dashboard if we can't determine verification status
                    navigate("/dashboard/discovermeal");
                }
            } else {
                setError("Login successful but no access token received");
            }
        } catch (err) {
            console.error("Login error:", err);
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
                        Welcome back to Oishii!
                    </h1>
                    <div className="space-y-4">
                        <div>
                            <FloatingLabelInputSmall
                                label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                            />
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

                        <p className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer" onClick={() => navigate("/intro/uniemail")}>
                            Don't have an account? Sign up
                        </p>
                        
                        <p className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer" onClick={() => navigate("/intro/getstarted")}>
                            Start registration from the beginning
                        </p>
                    </div>
                    
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? "LOGGING IN..." : "LOGIN"}
                    </Button>
                </div>
            </div>
        </Center>
    );
} 