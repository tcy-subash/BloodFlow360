export interface Donor {
  id: string;
  userId: string;
  bloodBankId: string;
  donorNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  aadhaarNumber: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  lastDonationDate: string | null;
  isEligible: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface CreateDonor {
  userId?: string;
  bloodBankId: string;
  donorNumber: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  aadhaarNumber: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  isEligible: boolean;
  isActive: boolean;
}

export interface UpdateDonor {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  bloodGroup: string;
  height: number;
  weight: number;
  aadhaarNumber: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  isEligible: boolean;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors?: string[];
}

export interface PagedResponse<T> extends ApiResponse<T> {
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
}

export const BLOOD_GROUPS = [
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
] as const;

export const GENDERS = ["Male", "Female", "Other"] as const;