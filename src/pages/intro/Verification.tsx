"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";
import { verifyUser, loginUser } from "@/api/users";
import { redirectIfUnauthenticated, isAuthenticated, storeAuthToken } from "@/utils/auth";

export default function Verification() {
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        // Get email from localStorage if available
        const storedEmail = localStorage.getItem("user_email");
        if (storedEmail) {
            setEmail(storedEmail);
        }
        
        // Check if user is authenticated
        const authToken = localStorage.getItem("auth_token");
        if (!authToken) {
            console.warn("No auth token found in Verification page. User may not be properly logged in.");
            // We'll continue anyway since we have the email
        }
        
        // We're not checking authentication status here anymore to avoid redirects
        // This allows users to verify their email even if auto-login failed
    }, [navigate]);

    useEffect(() => {
        // Countdown timer for resend button
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && resendDisabled) {
            setResendDisabled(false);
        }
    }, [countdown, resendDisabled]);

    const handleVerify = async () => {
        if (!code.trim()) {
            setError("Please enter the verification code");
            return;
        }

        // We're not checking authentication here anymore
        // This allows verification to proceed even if auto-login failed

        try {
            setIsLoading(true);
            setError(null);

            // Get the email from localStorage if not already set
            const userEmail = email || localStorage.getItem("user_email");
            
            if (!userEmail) {
                setError("Email not found. Please go back and try again.");
                return;
            }

            console.log("Verifying with email:", userEmail, "and code:", code);

            // Call the verification API
            const response = await verifyUser({
                email: userEmail,
                token: code,
                confirmationToken: code
            });

            console.log("Verification response:", response);

            if (response.error) {
                setError(response.error.detail || "Verification failed. Please check your code and try again.");
                return;
            }

            // Verification successful
            // Make sure we have an auth token (should have been set during registration)
            const authToken = localStorage.getItem("auth_token");
            if (!authToken) {
                console.warn("No auth token found after verification. User may need to log in manually.");
                // Try to log in again
                try {
                    const password = localStorage.getItem("user_password");
                    if (password) {
                        const loginResponse = await loginUser({
                            username: userEmail,
                            password: password
                        });
                        
                        if (loginResponse.data?.access_token) {
                            storeAuthToken(loginResponse.data.access_token);
                            console.log("Re-login successful after verification");
                        } else {
                            // If login fails, redirect to login page
                            console.error("Re-login failed after verification");
                            setError("Verification successful, but login failed. Please log in manually.");
                            setTimeout(() => {
                                navigate("/intro/login");
                            }, 3000);
                            return;
                        }
                    } else {
                        // If no password is stored, redirect to login page
                        setError("Verification successful, but no password found. Please log in manually.");
                        setTimeout(() => {
                            navigate("/intro/login");
                        }, 3000);
                        return;
                    }
                } catch (loginErr) {
                    console.error("Failed to re-login after verification:", loginErr);
                    setError("Verification successful, but login failed. Please log in manually.");
                    setTimeout(() => {
                        navigate("/intro/login");
                    }, 3000);
                    return;
                }
            }

            // Navigate to dashboard
            navigate("/dashboard/discovermeal");
            
            // Clean up the temporarily stored password
            localStorage.removeItem("user_password");
        } catch (err) {
            console.error("Verification error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendCode = async () => {
        try {
            setResendDisabled(true);
            setCountdown(60); // Disable for 60 seconds
            
            // In a real implementation, you would call an API to resend the code
            // For now, we'll just show a message
            setError("Verification code resent. Please check your email.");
            
            // TODO: Implement actual resend code functionality
            // const response = await resendVerificationCode(email);
        } catch (err) {
            console.error("Error resending code:", err);
            setError("Failed to resend verification code. Please try again.");
        }
    };

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

                        {error && (
                            <p className="text-white text-sm mt-1">{error}</p>
                        )}

                        <h1 
                            className={`font-montserrat text-[15px] mt-2 font-semibold ${
                                resendDisabled ? 'opacity-50' : 'cursor-pointer'
                            }`}
                            onClick={resendDisabled ? undefined : handleResendCode}
                        >
                            {resendDisabled 
                                ? `Resend code in ${countdown} seconds` 
                                : "Click here to resend"}
                        </h1>
                    </div>
                    
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90"
                        onClick={handleVerify}
                        disabled={isLoading}
                    >
                        {isLoading ? "VERIFYING..." : "CONTINUE"}
                    </Button>

                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white"
                            onClick={() => navigate("/intro/welcome")}
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
