import api from "../api/axios";
import type {
  BloodRequest,
  CreateBloodRequest,
  UpdateBloodRequest,
  BloodRequestApproval,
  BloodRequestRejection,
  BloodRequestIssue,
} from "../types/request";
import type { ApiResponse, PagedResponse } from "../types/donor";

export async function getRequestsPaged(
  pageNumber: number,
  pageSize: number,
  search?: string,
  status?: string
): Promise<PagedResponse<BloodRequest[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);
  if (status) params.append("status", status);

  const response = await api.get<PagedResponse<BloodRequest[]>>(
    `/BloodRequests/paged?${params.toString()}`
  );
  return response.data;
}

export async function getRequestById(id: string): Promise<BloodRequest> {
  const response = await api.get<ApiResponse<BloodRequest>>(`/BloodRequests/${id}`);
  return response.data.data;
}

export async function createRequest(data: CreateBloodRequest): Promise<void> {
  await api.post("/BloodRequests", data);
}

export async function updateRequest(
  id: string,
  data: UpdateBloodRequest
): Promise<void> {
  await api.put(`/BloodRequests/${id}`, data);
}

export async function deleteRequest(id: string): Promise<void> {
  await api.delete(`/BloodRequests/${id}`);
}

// Workflow Operations
export async function approveRequest(data: BloodRequestApproval): Promise<void> {
  await api.post("/BloodWorkflow/approve", {
    bloodRequestId: data.requestId,
    approvedUnits: data.approvedUnits,
    remarks: data.remarks,
  });
}

export async function rejectRequest(data: BloodRequestRejection): Promise<void> {
  await api.post("/BloodWorkflow/reject", {
    bloodRequestId: data.requestId,
    remarks: data.remarks,
  });
}

export async function issueRequest(data: BloodRequestIssue): Promise<void> {
  await api.post("/BloodWorkflow/issue", {
    bloodRequestId: data.requestId,
    remarks: data.remarks,
  });
}

export async function getWorkflowStatus(requestId: string): Promise<any> {
  const response = await api.get(`/BloodWorkflow/status/${requestId}`);
  return response.data;
}
