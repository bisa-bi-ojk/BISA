const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
  emailVerified: boolean;
  createdAt: string;
  updatedAt?: string;
  // Additional profile fields
  address?: string;
  dateOfBirth?: string;
  occupation?: string;
  bio?: string;
  phoneVerified?: boolean;
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

const handleApiError = async (response: Response): Promise<never> => {
  let errorData: ApiError;

  try {
    errorData = await response.json();
  } catch {
    errorData = {
      statusCode: response.status,
      message: response.statusText || 'An error occurred',
      error: 'Unknown Error',
    };
  }

  throw new Error(errorData.message || 'An error occurred');
};

const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_URL}${endpoint}`;

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    // Add timeout for better error handling
    signal: AbortSignal.timeout(10000), // 10 second timeout
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      await handleApiError(response);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }

    return response.text() as T;
  } catch (error) {
    if (error instanceof Error) {
      // Handle network errors more gracefully
      if (error.name === 'AbortError') {
        throw new Error('Request timeout - please check your connection');
      }
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Network error - please check your connection');
      }
      throw error;
    }
    throw new Error('Network error occurred');
  }
};

const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('auth_token');
};

export const setAuthToken = (token: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('auth_token', token);
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
  }
};

export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  return apiRequest<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (response.access_token) {
    setAuthToken(response.access_token);
  }

  return response;
};

export const logout = async (): Promise<{ message: string }> => {
  const token = getAuthToken();

  try {
    const response = await apiRequest<{ message: string }>('/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    removeAuthToken();

    return response;
  } catch (error) {
    removeAuthToken();
    throw error;
  }
};

export const getProfile = async (): Promise<User> => {
  const token = getAuthToken();

  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    return await apiRequest<User>('/auth/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // If profile fetch fails, remove the invalid token
    removeAuthToken();
    throw error;
  }
};

export const verifyEmail = async (token: string): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>(`/auth/verify-email?token=${encodeURIComponent(token)}`, {
    method: 'GET',
  });
};

export const forgotPassword = async (data: ForgotPasswordRequest): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const resetPassword = async (data: ResetPasswordRequest): Promise<{ message: string }> => {
  return apiRequest<{ message: string }>('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const isAuthenticated = (): boolean => {
  return getAuthToken() !== null;
};

export const getCurrentUser = (): User | null => {
  const token = getAuthToken();

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.user || null;
  } catch {
    return null;
  }
};
