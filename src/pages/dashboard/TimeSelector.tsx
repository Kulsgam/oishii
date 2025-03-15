"use client"

import { ArrowLeft } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useNavigate } from "react-router"

export default function MealScheduler() {
    const [selectedTime, setSelectedTime] = useState<string>("")

    const timeSlots = [
        "7:00 - 7:30 AM",
        "7:30 - 8:00 AM",
        "8:00 - 8:30 AM",
        "8:30 - 9:00 AM",
        "9:00 - 9:30 AM",
        "9:30 - 10:00 AM",
        "10:00 - 10:30 AM",
        "10:30 - 11:00 AM",
        "11:00 - 11:30 AM",
        "11:30 - 12:00 PM",
        "12:00 - 12:30 PM",
        "12:30 - 1:00 PM",
        "1:00 - 1:30 PM",
        "1:30 - 2:00 PM",
        "2:00 - 2:30 PM",
        "2:30 - 3:00 PM",
        "3:00 - 3:30 PM",
        "3:30 - 4:00 PM",
        "4:00 - 4:30 PM",
        "4:30 - 5:00 PM",
        "5:00 - 5:30 PM",
        "5:30 - 6:00 PM",
        "6:00 - 6:30 PM",
        "6:30 - 7:00 PM",
        "7:00 - 7:30 PM",
        "7:30 - 8:00 PM"
    ]

    const dates = [
        { value: "today", label: "Today", subtext: "March 15" },
        { value: "tomorrow", label: "Tomorrow", subtext: "March 16" },
        { value: "sunday", label: "Sunday", subtext: "March 17" },
        { value: "monday", label: "Monday", subtext: "March 18" },
        { value: "tuesday", label: "Tuesday", subtext: "March 19" },
        { value: "wednesday", label: "Wednesday", subtext: "March 20" },
        { value: "thursday", label: "Thursday", subtext: "March 21" },
        { value: "friday", label: "Friday", subtext: "March 22" },
        { value: "saturday", label: "Saturday", subtext: "March 23" },
        { value: "sunday", label: "Sunday", subtext: "March 24" }
    ];



    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-md mx-auto p-4">
                <div className="flex items-center mb-6" onClick={() => navigate("/dashboard/mealform")}>
                    <ArrowLeft className="h-6 w-6 text-amber-500 cursor-pointer" />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-[#FF6B00] text-2xl font-bold mb-2">Decide On When</h1>
                        <p className="text-gray-600">When would you like your meal to be picked up / delivered by others?</p>
                    </div>

                    <Tabs defaultValue="today">
                        <TabsList className="w-full justify-start bg-gray-100 h-[150px] overflow-x-auto -pl-20">
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

                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="flex flex-col gap-3 overflow-y-auto h-[500px]">
                        {timeSlots.map((time) => (
                            <Label
                                key={time}
                                className="flex items-center space-x-3 border-3 border-black/10 rounded-lg p-3 cursor-pointer hover:bg-gray-200 text-amber-500"
                            >
                                <RadioGroupItem value={time} />
                                <span>{time}</span>
                            </Label>
                        ))}
                    </RadioGroup>

                    <Button className="w-full bg-[#FF6B00] hover:bg-[#FF6B00]/90 text-white cursor-pointer" size="lg"
                        onClick={() => navigate("/dashboard/deliverymethod")}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

