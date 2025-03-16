import type React from "react";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";

export default function MealRequestForm() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [mealName, setMealName] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const [customRequirements, setCustomRequirements] = useState("");

  const dietaryOptions = ["Vegetarian", "Vegan", "Halal", "None", "Custom"];

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      mealName,
      mealDescription,
      dietaryRequirement: selectedOption,
      customRequirements,
    });
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white">
      <div className="mx-5 mt-5">
        <div className="p-4">
          <button className="text-[#f57600] hover:cursor-pointer">
            <ArrowLeft size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col px-4 pb-4"
        >
          {/* Title */}
          <h1 className="font-montagu-slab mb-4 text-2xl text-[32px] font-bold text-[#f57600]">
            Describe Your Needs
          </h1>

          {/* Meal Name Input */}
          <input
            type="text"
            placeholder="Insert Meal Name"
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
            className="font-montserrat mb-4 w-full rounded-md border border-[#f57600]/60 p-3 text-[16px] text-[#f57600] placeholder-[##f57600]/60 focus:border-[#f57600] focus:outline-none"
          />

          {/* Meal Description */}
          <textarea
            placeholder="Write what meal you would like someone to make for you!"
            value={mealDescription}
            onChange={(e) => setMealDescription(e.target.value)}
            className="font-montserrat mb-6 h-42 w-full rounded-md border border-[#f57600]/60 p-3 text-[16px] text-[#f57600] placeholder-[##f57600]/60 focus:border-[#f57600] focus:outline-none"
          />

          {/* Dietary Requirements */}
          <div className="mb-4">
            <h2 className="font-montagu-slab mb-3 text-xl text-[20px] font-semibold text-orange-500">
              Dietary Requirements
            </h2>

            <div className="space-y-2">
              {dietaryOptions.map((option) => (
                <label
                  key={option}
                  className="flex items-center hover:cursor-pointer"
                >
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        type="radio"
                        name="dietary"
                        checked={selectedOption === option}
                        onChange={() => handleOptionChange(option)}
                        className="h-4 w-4 border-orange-300 text-[#f57600] hover:cursor-pointer focus:ring-[#f57600]"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <span className="font-bold text-[#f57600]">{option}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Custom Requirements (only shown when Custom is selected) */}
          {selectedOption === "Custom" && (
            <textarea
              placeholder="Write your own dietary requirements if needed. Remember you can also change the default from your profile!"
              value={customRequirements}
              onChange={(e) => setCustomRequirements(e.target.value)}
              className="font-montserrat mb-6 h-42 w-full rounded-md border border-[#f57600]/60 p-3 text-[16px] text-[#f57600] placeholder-[##f57600]/60 focus:border-[#f57600] focus:outline-none"
            />
          )}

          {/* Spacer to push button to bottom */}
          <div className="flex-grow"></div>

          {/* Continue Button */}
          <button
            type="submit"
            className="bg-bold font-montagu-slab w-full rounded-md bg-[#f57600] py-3 font-medium text-white select-none hover:cursor-pointer"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
