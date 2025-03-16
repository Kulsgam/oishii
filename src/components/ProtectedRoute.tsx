import { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { redirectIfUnauthenticated } from "@/utils/auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * A higher-order component that protects routes requiring authentication
 * Redirects to login page if user is not authenticated or token is expired
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const unauthorized = redirectIfUnauthenticated(navigate);
    setIsAuthorized(!unauthorized);
  }, [navigate]);

  // Show nothing while checking authentication
  if (!isAuthorized) {
    return null;
  }

  // Render children if authenticated
  return <>{children}</>;
} 