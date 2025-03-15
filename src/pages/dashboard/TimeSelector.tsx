"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router"
import MobileNav from "./MobileNav"

interface MealFormData {
    type: 'post' | 'request';
    title: string;
    description: string;
    imageUrl?: string;
    referenceId?: string;
}

export default function TimeSelector() {
    const navigate = useNavigate();
    const [selectedTime, setSelectedTime] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("today")
    const [formData, setFormData] = useState<MealFormData | null>(null)

    // Load form data from localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('meal_form_data');
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setFormData(parsedData);
            } catch (e) {
                console.error('Error parsing stored form data:', e);
            }
        } else {
            // If no data, go back to form
            navigate('/dashboard/mealform');
        }
    }, [navigate]);

    // Generate dates for the next 7 days
    const dates = [
        { value: "today", label: "Today", subtext: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) },
        ...Array.from({ length: 6 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() + i + 1);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            const dayMonth = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            return {
                value: `day-${i + 1}`,
                label: dayName,
                subtext: dayMonth
            };
        })
    ];

    // Generate time slots from 8 AM to 10 PM
    const timeSlots = Array.from({ length: 15 }, (_, i) => {
        const hour = i + 8;
        const amPm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour > 12 ? hour - 12 : hour;
        return `${hour12}:00 ${amPm}`;
    });

    const handleContinue = () => {
        if (!selectedTime) return;
        
        // Store selected time and date
        const updatedFormData = {
            ...formData,
            selectedDate,
            selectedTime
        };
        
        localStorage.setItem('meal_form_data', JSON.stringify(updatedFormData));
        navigate("/dashboard/deliverymethod");
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-md mx-auto p-4 pb-20">
                <div className="flex items-center mb-6">
                    <ArrowLeft 
                        className="h-6 w-6 text-[#FF6B00] cursor-pointer" 
                        onClick={() => navigate("/dashboard/mealform")} 
                    />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-[#FF6B00] text-2xl font-bold mb-2">
                            {formData?.type === 'post' 
                                ? 'When is your meal available?' 
                                : 'When do you need this meal?'}
                        </h1>
                        <p className="text-gray-600">
                            {formData?.type === 'post'
                                ? 'When would you like your meal to be picked up / delivered?'
                                : 'When would you like to receive this meal?'}
                        </p>
                    </div>

                    <Tabs defaultValue="today" onValueChange={setSelectedDate}>
                        <TabsList className="w-full justify-start bg-gray-100 h-[150px] overflow-x-auto">
                            {dates.map((date) => (
                                <TabsTrigger
                                    key={date.value}
                                    value={date.value}
                                    className="data-[state=active]:bg-white data-[state=active]:text-[#FF6B00] flex flex-col py-2 gap-0.5 cursor-pointer"
                                >
                                    <span>{date.label}</span>
                                    <span className="text-xs text-gray-500">{date.subtext}</span>
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </Tabs>

                    <div className="max-h-[400px] overflow-y-auto">
                        <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="flex flex-col gap-3">
                            {timeSlots.map((time) => (
                                <Label
                                    key={time}
                                    className={`flex items-center space-x-3 border-2 rounded-lg p-3 cursor-pointer hover:bg-gray-100 
                                        ${selectedTime === time ? 'border-[#FF6B00] text-[#FF6B00]' : 'border-gray-200 text-gray-700'}`}
                                >
                                    <RadioGroupItem value={time} />
                                    <span>{time}</span>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    <Button 
                        className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white cursor-pointer" 
                        size="lg"
                        onClick={handleContinue}
                        disabled={!selectedTime}
                    >
                        Continue
                    </Button>
                </div>
            </div>
            
            {/* Mobile Navigation */}
            <MobileNav />
        </div>
    )
}

