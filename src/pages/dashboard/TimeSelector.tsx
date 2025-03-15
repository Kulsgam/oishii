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
        "10:30 - 11:00 AM",
        "11:00 - 11:30 AM",
    ]

    const dates = [
        { value: "today", label: "Today", subtext: "March 15" },
        { value: "tomorrow", label: "Tomorrow", subtext: "March 16" },
        { value: "tuesday", label: "Tuesday", subtext: "March 17" },
    ]

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

                    <Tabs defaultValue="today" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 h-auto">
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

                    <RadioGroup value={selectedTime} onValueChange={setSelectedTime} className="flex flex-col gap-3">
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

