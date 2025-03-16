import api from '@/api/api';

// Constants
const DATASTAX_TOKEN_KEY = 'datastax_token';
const DATASTAX_TOKEN_EXPIRY_KEY = 'datastax_token_expiry';
const TOKEN_REFRESH_BUFFER = 5 * 60 * 1000; // 5 minutes in milliseconds

/**
 * Get the DataStax token from localStorage
 * @returns The DataStax token or null if not found
 */
export function getDataStaxToken(): string | null {
  return localStorage.getItem(DATASTAX_TOKEN_KEY);
}

/**
 * Check if the DataStax token is expired or about to expire
 * @returns boolean indicating if the token is expired or will expire soon
 */
export function isDataStaxTokenExpired(): boolean {
  const expiryTimestamp = localStorage.getItem(DATASTAX_TOKEN_EXPIRY_KEY);
  if (!expiryTimestamp) return true;
  
  // Check if token is expired or will expire soon (within buffer time)
  const expiryTime = parseInt(expiryTimestamp);
  return Date.now() + TOKEN_REFRESH_BUFFER > expiryTime;
}

/**
 * Store DataStax token with expiry timestamp
 * @param token The DataStax token to store
 * @param expiresIn Expiration time in seconds
 */
export function storeDataStaxToken(token: string, expiresIn: number = 3600): void {
  localStorage.setItem(DATASTAX_TOKEN_KEY, token);
  
  // Calculate expiry timestamp (current time + expiry time in ms)
  const expiryTimestamp = Date.now() + (expiresIn * 1000);
  localStorage.setItem(DATASTAX_TOKEN_EXPIRY_KEY, expiryTimestamp.toString());
}

/**
 * Clear DataStax token data
 */
export function clearDataStaxToken(): void {
  localStorage.removeItem(DATASTAX_TOKEN_KEY);
  localStorage.removeItem(DATASTAX_TOKEN_EXPIRY_KEY);
}

/**
 * Refresh the DataStax token
 * @returns A promise that resolves to the new token or null if refresh failed
 */
export async function refreshDataStaxToken(): Promise<string | null> {
  try {
    // Call the backend endpoint to refresh the token
    const response = await api.post('/api/v1/datastax/refresh-token');
    
    if (response.status === 200 && response.data.token) {
      const { token, expires_in } = response.data;
      storeDataStaxToken(token, expires_in);
      return token;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to refresh DataStax token:', error);
    return null;
  }
}

/**
 * Get a valid DataStax token, refreshing if necessary
 * @returns A promise that resolves to a valid token or null if unavailable
 */
export async function getValidDataStaxToken(): Promise<string | null> {
  const currentToken = getDataStaxToken();
  
  // If no token or token is expired, try to refresh
  if (!currentToken || isDataStaxTokenExpired()) {
    return await refreshDataStaxToken();
  }
  
  return currentToken;
}

/**
 * Handle DataStax API error response
 * @param error The error object from the API call
 * @returns A promise that resolves to a new token if refresh was successful, or null
 */
export async function handleDataStaxTokenError(error: any): Promise<string | null> {
  // Check if error is due to expired token
  const isAuthError = error?.response?.status === 401;
  const errorDetail = error?.response?.data?.detail || '';
  const isExpiredToken = isAuthError && 
    (errorDetail.includes('expired') || errorDetail.includes('Invalid authentication token'));
  
  if (isExpiredToken) {
    console.log('DataStax token expired, attempting to refresh...');
    return await refreshDataStaxToken();
  }
  
  return null;
} 