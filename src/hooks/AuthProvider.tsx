import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { isAuthenticated, isTokenExpired, clearAuth, storeAuthToken } from '@/utils/auth';

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  dietaryRestrictions?: string[];
  allergies?: string[];
  cuisinePreferences?: string[];
  healthGoals?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated() || isTokenExpired()) {
      clearAuth();
      setToken(null);
      setUser(null);
      setIsLoading(false);
      return;
    }

    // Get token from localStorage
    const authToken = localStorage.getItem('auth_token');
    setToken(authToken);

    // Create user object from localStorage data
    const userData: User = {
      email: localStorage.getItem('user_email') || undefined,
      firstName: localStorage.getItem('user_first_name') || undefined,
      lastName: localStorage.getItem('user_last_name') || undefined,
      fullName: getFullName(),
      dietaryRestrictions: getArrayFromStorage('user_dietary_requirements'),
      allergies: getArrayFromStorage('user_allergies'),
      cuisinePreferences: getArrayFromStorage('user_cuisine_preferences'),
      healthGoals: getArrayFromStorage('user_health_goals')
    };

    setUser(userData);
    setIsLoading(false);
  }, []);

  // Helper function to get full name
  const getFullName = (): string | undefined => {
    const firstName = localStorage.getItem('user_first_name');
    const lastName = localStorage.getItem('user_last_name');
    
    if (firstName && lastName) {
      return `${firstName} ${lastName}`;
    } else if (firstName) {
      return firstName;
    } else if (lastName) {
      return lastName;
    }
    
    return undefined;
  };

  // Helper function to get array data from localStorage
  const getArrayFromStorage = (key: string): string[] | undefined => {
    const value = localStorage.getItem(key);
    if (!value) return undefined;
    
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error(`Error parsing ${key} from localStorage:`, e);
      return undefined;
    }
  };

  // Login function
  const login = (newToken: string) => {
    storeAuthToken(newToken);
    setToken(newToken);
    
    // Reload user data
    const userData: User = {
      email: localStorage.getItem('user_email') || undefined,
      firstName: localStorage.getItem('user_first_name') || undefined,
      lastName: localStorage.getItem('user_last_name') || undefined,
      fullName: getFullName(),
      dietaryRestrictions: getArrayFromStorage('user_dietary_requirements'),
      allergies: getArrayFromStorage('user_allergies'),
      cuisinePreferences: getArrayFromStorage('user_cuisine_preferences'),
      healthGoals: getArrayFromStorage('user_health_goals')
    };
    
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 