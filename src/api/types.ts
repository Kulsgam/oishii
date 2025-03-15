export interface RegisterUserRequest {
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
  is_verified: boolean;
  password: string;
}

// Define success response type
export interface RegisterUserResponse {
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
  profile_picture: string;
  created_at: string;
  updated_at: string;
  swap_rating: number;
  is_verified: boolean;
}

export interface TokenUserResponse {
  accessToken: string;
  tokenType: string;
}

export interface VerifyUserRequest {
  email: string;
  code: string;
}

export interface DummyTokenUserResponse extends TokenUserResponse {
  email: string;
}

export interface TokenUserRequest {
  username: string;
  password: string;
}

// Define error response type
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiError {
  detail: ValidationError[];
}
