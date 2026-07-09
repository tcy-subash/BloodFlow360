export type UserStatus = 0 | 1 | 2; // Active = 0, Inactive = 1, Locked = 2

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: UserStatus;
  lastLoginAt?: string;
  profileImageUrl?: string;
  preferredLanguage: string;
  timeZone: string;
  roles: string[];
}

export interface CreateUser {
  username: string;
  email: string;
  phoneNumber: string;
  passwordHash: string; // Used for plain password input
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  preferredLanguage: string;
  timeZone: string;
  roles: string[];
}

export interface UpdateUser {
  username: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: UserStatus;
  profileImageUrl?: string;
  preferredLanguage: string;
  timeZone: string;
  roles: string[];
}
