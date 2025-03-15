/**
 * Check if the user is authenticated
 * @returns boolean indicating if the user has a valid auth token
 */
export function isAuthenticated(): boolean {
  const token = localStorage.getItem("auth_token");
  return !!token;
}

/**
 * Check if the token is expired
 * Note: This is a simple implementation. In a production app, you would
 * decode the JWT and check its expiration date.
 * @returns boolean indicating if the token is likely expired
 */
export function isTokenExpired(): boolean {
  const tokenTimestamp = localStorage.getItem("auth_token_timestamp");
  if (!tokenTimestamp) return true;
  
  // Check if token is older than 24 hours (86400000 ms)
  const tokenAge = Date.now() - parseInt(tokenTimestamp);
  return tokenAge > 86400000;
}

/**
 * Store authentication token with timestamp
 * @param token The authentication token to store
 */
export function storeAuthToken(token: string): void {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_token_timestamp", Date.now().toString());
}

/**
 * Clear all authentication data and user registration data
 */
export function clearAuth(): void {
  // Clear auth tokens
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token_timestamp");
  
  // Clear user registration data
  localStorage.removeItem("user_email");
  localStorage.removeItem("user_first_name");
  localStorage.removeItem("user_last_name");
  localStorage.removeItem("user_bio");
  localStorage.removeItem("user_cook_type");
  localStorage.removeItem("user_cook_frequency");
  localStorage.removeItem("user_dietary_requirements");
  localStorage.removeItem("user_allergies");
  localStorage.removeItem("user_purpose");
  localStorage.removeItem("user_home_address");
}

/**
 * Redirect to the welcome page if not authenticated or token is expired
 * @param navigate The navigate function from useNavigate
 * @returns boolean indicating if redirect occurred
 */
export function redirectIfUnauthenticated(navigate: any): boolean {
  if (!isAuthenticated() || isTokenExpired()) {
    clearAuth();
    navigate("/intro/welcome");
    return true;
  }
  return false;
} 