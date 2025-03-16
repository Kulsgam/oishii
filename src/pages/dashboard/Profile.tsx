import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { 
  User, 
  Settings, 
  LogOut, 
  Edit, 
  Star, 
  Award, 
  Ticket, 
  ChevronRight,
  Camera,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileNav from "./MobileNav";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser } from "@/api/users";

// Define a more specific interface that matches the backend response
interface UserProfileData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  bio: string;
  cook_type: string;
  cook_frequency: string;
  dietary_requirements: string[];
  allergies: string;
  purpose: string;
  home_address: string;
  profile_picture?: string;
  swap_rating?: number;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("info");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setLoading(true);
        // Get token from localStorage
        const token = localStorage.getItem("auth_token");
        
        if (!token) {
          // Redirect to login if no token
          navigate("/intro/getstarted");
          return;
        }
        
        const response = await getCurrentUser(token);
        
        if (response.error) {
          setError(response.error.detail || "Failed to load profile");
          return;
        }
        
        setProfile(response.data as unknown as UserProfileData);
      } catch (err) {
        console.error("Failed to load profile:", err);
        setError("Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  const handleEditProfile = () => {
    navigate("/dashboard/edit-profile");
  };

  const handleLogout = () => {
    // Clear auth token and redirect to login
    localStorage.removeItem("auth_token");
    navigate("/intro/welcome");
  };

  // Helper function to get user's full name
  const getUserFullName = () => {
    if (!profile) return "";
    return `${profile.first_name} ${profile.last_name}`;
  };

  // Helper function to get user's initials for avatar
  const getUserInitials = () => {
    if (!profile) return "";
    return `${profile.first_name.charAt(0)}${profile.last_name.charAt(0)}`;
  };

  // Helper function to format dietary requirements as an array
  const getDietaryRequirements = () => {
    if (!profile || !profile.dietary_requirements) return [];
    
    // If it's already an array, return it
    if (Array.isArray(profile.dietary_requirements)) {
      return profile.dietary_requirements;
    }
    
    // Otherwise, try to parse it or split it
    try {
      if (typeof profile.dietary_requirements === 'string') {
        // Try to parse as JSON if it looks like an array
        if (profile.dietary_requirements.startsWith('[')) {
          return JSON.parse(profile.dietary_requirements);
        }
        // Otherwise split by commas
        return profile.dietary_requirements.split(',').map(item => item.trim());
      }
    } catch (e) {
      console.error("Error parsing dietary requirements:", e);
    }
    
    return [];
  };

  // Helper function to format allergies as an array
  const getAllergies = () => {
    if (!profile || !profile.allergies) return [];
    
    // If allergies is a string, split it by commas
    if (typeof profile.allergies === 'string') {
      return profile.allergies.split(',').map(item => item.trim()).filter(item => item);
    }
    
    return [];
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <Skeleton className="h-24 w-24 rounded-full mb-4" />
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-60" />
          </div>
          
          <Skeleton className="h-10 w-full mb-6" />
          
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white min-h-screen">
        <div className="px-4 py-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Profile</h1>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5 text-gray-500" />
            </Button>
          </div>
          
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
            <p className="text-gray-700">{error}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
        <MobileNav />
      </div>
    );
  }

  if (!profile) return null;

  const dietaryRequirements = getDietaryRequirements();
  const allergies = getAllergies();

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      <div className="px-4 py-6 pb-20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#FF6B00]">Profile</h1>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <Avatar className="h-24 w-24 border-2 border-[#FF6B00]">
              <AvatarImage src={profile.profile_picture} />
              <AvatarFallback className="bg-[#FF6B00] text-white text-xl">
                {getUserInitials()}
              </AvatarFallback>
            </Avatar>
            <Button 
              size="icon" 
              className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[#FF6B00] hover:bg-[#E05A00]"
              onClick={handleEditProfile}
            >
              <Camera className="h-4 w-4 text-white" />
            </Button>
          </div>
          <h2 className="text-xl font-bold mb-1">{getUserFullName()}</h2>
          <p className="text-gray-600 text-sm mb-2">{profile.email}</p>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{profile.swap_rating?.toFixed(1) || "N/A"}</span>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="info" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="info">Information</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="info" className="space-y-6">
            {/* Bio */}
            <div>
              <h3 className="font-bold mb-2">About Me</h3>
              <p className="text-gray-700">{profile.bio || "No bio provided"}</p>
            </div>
            
            {/* Location */}
            <div>
              <h3 className="font-bold mb-2">Location</h3>
              <p className="text-gray-700">{profile.home_address || "No location provided"}</p>
            </div>
            
            {/* Cook Type */}
            <div>
              <h3 className="font-bold mb-2">Cook Type</h3>
              <p className="text-gray-700">{profile.cook_type || "Not specified"}</p>
            </div>
            
            {/* Cook Frequency */}
            <div>
              <h3 className="font-bold mb-2">Cook Frequency</h3>
              <p className="text-gray-700">{profile.cook_frequency || "Not specified"}</p>
            </div>
            
            {/* Dietary Requirements */}
            <div>
              <h3 className="font-bold mb-2">Dietary Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {dietaryRequirements.length > 0 ? (
                  dietaryRequirements.map((req, index) => (
                    <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {req}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No dietary requirements specified</p>
                )}
              </div>
            </div>
            
            {/* Allergies */}
            <div>
              <h3 className="font-bold mb-2">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {allergies.length > 0 ? (
                  allergies.map((allergy, index) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                      {allergy}
                    </Badge>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No allergies specified</p>
                )}
              </div>
            </div>
            
            {/* Purpose */}
            <div>
              <h3 className="font-bold mb-2">Purpose</h3>
              <p className="text-gray-700">{profile.purpose || "Not specified"}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            {/* Tickets */}
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center">
                <Ticket className="h-6 w-6 text-[#FF6B00] mr-3" />
                <div>
                  <h3 className="font-bold">Available Tickets</h3>
                  <p className="text-gray-600 text-sm">Use these to claim meals</p>
                </div>
              </div>
              <span className="text-xl font-bold text-[#FF6B00]">0</span>
            </div>
            
            {/* Meals Shared */}
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-100">
              <div className="flex items-center">
                <Award className="h-6 w-6 text-green-600 mr-3" />
                <div>
                  <h3 className="font-bold">Meals Shared</h3>
                  <p className="text-gray-600 text-sm">Meals you've offered</p>
                </div>
              </div>
              <span className="text-xl font-bold text-green-600">0</span>
            </div>
            
            {/* Meals Received */}
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-center">
                <User className="h-6 w-6 text-blue-600 mr-3" />
                <div>
                  <h3 className="font-bold">Meals Received</h3>
                  <p className="text-gray-600 text-sm">Meals you've claimed</p>
                </div>
              </div>
              <span className="text-xl font-bold text-blue-600">0</span>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Settings Button */}
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          onClick={() => navigate("/dashboard/settings")}
        >
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-500" />
            <span>Settings</span>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
} 