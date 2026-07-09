import api from "../api/axios";
import type { BloodIssue, CreateBloodIssue, UpdateBloodIssue } from "../types/bloodissue";
import type { ApiResponse, PagedResponse } from "../types/donor";

export async function getBloodIssuesPaged(
  pageNumber: number,
  pageSize: number,
  search?: string
): Promise<PagedResponse<BloodIssue[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await api.get<PagedResponse<BloodIssue[]>>(
    `/BloodIssues/paged?${params.toString()}`
  );
  return response.data;
}

export async function getBloodIssueById(id: string): Promise<BloodIssue> {
  const response = await api.get<ApiResponse<BloodIssue>>(`/BloodIssues/${id}`);
  return response.data.data;
}

export async function createBloodIssue(data: CreateBloodIssue): Promise<void> {
  await api.post("/BloodIssues", data);
}

export async function updateBloodIssue(
  id: string,
  data: UpdateBloodIssue
): Promise<void> {
  await api.put(`/BloodIssues/${id}`, data);
}

export async function deleteBloodIssue(id: string): Promise<void> {
  await api.delete(`/BloodIssues/${id}`);
}
