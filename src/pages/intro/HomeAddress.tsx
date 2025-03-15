"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Center from "@/components/Center";
import { FloatingLabelInputSmall } from "@/components/FloatingLabelInputSmall";
import { useNavigate } from "react-router";
import { LocationPicker, Location } from "@/components/maps/LocationPicker";

export default function HomeAddress() {
    const navigate = useNavigate();
    const [homeAddress, setHomeAddress] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [skipAddress, setSkipAddress] = useState(false);
    const [location, setLocation] = useState<Location | null>(null);

    const validateForm = () => {
        if (!homeAddress.trim() && !location && !skipAddress) {
            setError("Please enter your address, select a location on the map, or click 'Fill this later'");
            return false;
        }
        setError(null);
        return true;
    };

    const handleContinue = () => {
        if (validateForm()) {
            if (location) {
                localStorage.setItem("user_location", JSON.stringify(location));
                localStorage.setItem("user_home_address", location.formatted_address);
            } else if (homeAddress.trim()) {
                localStorage.setItem("user_home_address", homeAddress);
            }
            navigate("/intro/uniemail");
        }
    };

    const handleSkip = () => {
        setSkipAddress(true);
        setError(null);
        navigate("/intro/uniemail");
    };

    const handleLocationSelected = (newLocation: Location) => {
        setLocation(newLocation);
        setHomeAddress(newLocation.formatted_address);
    };

    return (
        <Center>
            <div className="bg-[#f57600] p-6">
                <div className="mx-auto max-w-md space-y-8">
                    <h1 className="font-montagu-slab text-[32px] font-bold text-white">
                        Please input your home address
                    </h1>
                    <div>
                        <FloatingLabelInputSmall
                            label="Insert home address"
                            value={homeAddress}
                            onChange={(e) => setHomeAddress(e.target.value)}
                        />

                        <div className="mt-4 bg-white p-4 rounded-lg">
                            <h2 className="text-[#f57600] font-semibold mb-2">Or select your location on the map</h2>
                            <LocationPicker
                                initialLocation={location || undefined}
                                onLocationSelected={handleLocationSelected}
                            />
                        </div>

                        {error && (
                            <p className="text-white text-sm mt-1">{error}</p>
                        )}

                        <h1 
                            className="font-montserrat text-[15px] mt-2 font-semibold cursor-pointer"
                            onClick={handleSkip}
                        >
                            You can fill this later in your profile
                        </h1>
                    </div>
                    <Button
                        className="font-montserrat h-[40px] w-full rounded-[20px] bg-white text-[15px] text-[#f57600] hover:bg-white/90 cursor-pointer"
                        onClick={handleContinue}
                    >
                        CONTINUE
                    </Button>

                    <div className="fixed bottom-6 left-6">
                        <Button
                            size="icon"
                            className="text-[#f57600] hover:bg-white/80 bg-white cursor-pointer"
                            onClick={() => navigate("/intro/purpose")}
                        >
                            <ArrowLeft className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
        </Center>
    );
}
