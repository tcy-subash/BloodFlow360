import api from "../api/axios";
import type { Hospital, CreateHospital, UpdateHospital } from "../types/hospital";
import type { ApiResponse, PagedResponse } from "../types/donor";

export async function getHospitals(): Promise<Hospital[]> {
  const response = await api.get<ApiResponse<Hospital[]>>("/Hospitals");
  return response.data.data;
}

export async function getHospitalsPaged(
  pageNumber: number,
  pageSize: number,
  search?: string
): Promise<PagedResponse<Hospital[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await api.get<PagedResponse<Hospital[]>>(
    `/Hospitals/paged?${params.toString()}`
  );
  return response.data;
}

export async function getHospitalById(id: string): Promise<Hospital> {
  const response = await api.get<ApiResponse<Hospital>>(`/Hospitals/${id}`);
  return response.data.data;
}

export async function createHospital(data: CreateHospital): Promise<void> {
  await api.post("/Hospitals", data);
}

export async function updateHospital(
  id: string,
  data: UpdateHospital
): Promise<void> {
  await api.put(`/Hospitals/${id}`, data);
}

export async function deleteHospital(id: string): Promise<void> {
  await api.delete(`/Hospitals/${id}`);
}
