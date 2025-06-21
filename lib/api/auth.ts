/**
 * Authentication API service
 * Handles all authentication-related API calls to the backend
 */

const API_BASE_URL = 'https://bisa-backend.fly.dev';

// Types for API requests and responses
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'citizen' | 'admin';
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  role: 'citizen' | 'admin';
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error: string;
}

// Helper function to handle API errors
const handleApiError = async (response: Response): Promise<never> => {
  let errorData: ApiError;
  
  try {
    errorData = await response.json();
  } catch {
    errorData = {
      statusCode: response.status,
      message: response.statusText || 'An error occurred',
      error: 'Unknown Error'
    };
  }
  
  throw new Error(errorData.message || 'An error occurred');
};

// Helper function to make API requests
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      await handleApiError(response);
    }
    
    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return response.text() as T;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

// Helper function to set auth token in localStorage
export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

// Helper function to remove auth token from localStorage
export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

// API Functions

/**
 * Register a new user
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  
  // Store the token after successful login
  if (response.access_token) {
    setAuthToken(response.access_token);
  }
  
  return response;
};

/**
 * Logout user
 */
export const logout = async (): Promise<{ message: string }> => {
  const token = getAuthToken();
  
  try {
    const response = await apiRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Remove token from localStorage
    removeAuthToken();
    
    return response;
  } catch (error) {
    // Even if the API call fails, remove the token locally
    removeAuthToken();
    throw error;
  }
};

/**
 * Get user profile
 */
export const getProfile = async (): Promise<User> => {
  const token = getAuthToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }
  
  return apiRequest<User>('/auth/profile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

/**
 * Verify email with token
 */
export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: 'GET',
  });
};

/**
 * Verify OTP
 */
export const verifyOtp = async (email: string, otp: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/auth/verify-otp?email=${encodeURIComponent(email)}&otp=${encodeURIComponent(otp)}`, {
    method: 'GET',
  });
};

/**
 * Request password reset
 */
export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Reset password with token
 */
export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

/**
 * Get current user from token (without API call)
 * This is a simple check, for full user data use getProfile()
 */
export const getCurrentUser = (): User | null => {
  const token = getAuthToken();
  
  if (!token) return null;
  
  try {
    // Decode JWT token to get user info (basic implementation)
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user || null;
  } catch {
    return null;
  }
};
