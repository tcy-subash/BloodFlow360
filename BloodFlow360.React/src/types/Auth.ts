export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  userId: string;
  username: string;
  email: string;
  token: string;
  expiresAt: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  phoneNumber: string;
  password?: string;
}

export interface RegisterResponse {
  userId: string;
  username: string;
  email: string;
  token: string;
  expiresAt: string;
}