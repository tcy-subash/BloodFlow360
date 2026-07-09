export interface BloodRequest {
  id: string;
  hospitalId: string;
  hospitalName: string;
  bloodGroupId: string;
  bloodGroupName: string;
  requestNumber: string;
  unitsRequested: number;
  unitsApproved: number;
  unitsIssued: number;
  patientName: string;
  doctorName: string;
  isEmergency: boolean;
  status: "Pending" | "Approved" | "Issued" | "Rejected";
  createdAt: string;
}

export interface CreateBloodRequest {
  hospitalId: string;
  bloodGroupId: string;
  requestNumber: string;
  unitsRequested: number;
  patientName: string;
  doctorName: string;
  isEmergency: boolean;
}

export interface UpdateBloodRequest {
  unitsRequested: number;
  patientName: string;
  doctorName: string;
  isEmergency: boolean;
}

export interface BloodRequestApproval {
  requestId: string;
  approvedUnits: number;
  remarks: string;
}

export interface BloodRequestRejection {
  requestId: string;
  remarks: string;
}

export interface BloodRequestIssue {
  requestId: string;
  remarks: string;
}

export const REQUEST_STATUSES = [
  "Pending",
  "Approved",
  "Issued",
  "Rejected",
] as const;
