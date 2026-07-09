export interface Hospital {
  id: string;
  bloodBankId: string;
  bloodBankName: string;
  code: string;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  contactPerson: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateHospital {
  bloodBankId: string;
  code: string;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  contactPerson: string;
}

export interface UpdateHospital {
  code: string;
  name: string;
  registrationNumber: string;
  email: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  district: string;
  state: string;
  country: string;
  postalCode: string;
  contactPerson: string;
  isActive: boolean;
}
