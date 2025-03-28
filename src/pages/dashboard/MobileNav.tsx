import { Home, Heart, Plus, MessageCircle, User } from "lucide-react"
import { useNavigate } from "react-router";

export default function MobileNav() {
    const navigate = useNavigate();
    return (
        <nav className="fixed bottom-0 left-0 right-0 text-white border-t max-w-md mx-auto bg-[#FF6B00]">
            <div className="flex justify-around gap-x-20 py-3">
                <div className="flex gap-x-14">
                    <Home 
                        className="h-6 w-6 cursor-pointer" 
                        onClick={() => navigate("/dashboard/discovermeal")}
                    />
                    <Heart 
                        className="h-6 w-6 cursor-pointer" 
                        onClick={() => navigate("/dashboard/drfoodlove")}
                    />
                </div>
                <div className="flex gap-x-14">
                    <MessageCircle className="h-6 w-6 cursor-pointer" />
                    <User 
                        className="h-6 w-6 cursor-pointer" 
                        onClick={() => navigate("/dashboard/profile")}
                    />
                </div>
                <div
                    className="absolute -top-[25px] cursor-pointer flex justify-center items-center text-[#FF6B00] rounded-full bg-white border-[#FF6B00] border-2 h-14 w-14"
                    onClick={() => navigate("/dashboard/mealswap")}
                >
                    <Plus className="h-8 w-8 " />
                </div>
            </div>
        </nav>
    )
}

