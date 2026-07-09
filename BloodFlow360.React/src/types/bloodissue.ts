export interface BloodIssue {
  id: string;
  bloodRequestId: string;
  requestNumber: string;
  bloodGroupName: string;
  hospitalId: string;
  hospitalName: string;
  issueNumber: string;
  issueDate: string;
  totalUnitsIssued: number;
  issuedBy: string;
  receivedBy: string;
  status: string;
  remarks: string;
}

export interface CreateBloodIssue {
  bloodRequestId: string;
  hospitalId: string;
  issueNumber: string;
  issueDate: string;
  totalUnitsIssued: number;
  issuedBy: string;
  receivedBy: string;
  status: string;
  remarks: string;
}

export interface UpdateBloodIssue {
  issueDate: string;
  totalUnitsIssued: number;
  issuedBy: string;
  receivedBy: string;
  status: string;
  remarks: string;
}
