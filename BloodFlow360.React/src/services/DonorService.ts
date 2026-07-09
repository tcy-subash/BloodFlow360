import api from "../api/axios";
import type {
  Donor,
  CreateDonor,
  UpdateDonor,
  ApiResponse,
  PagedResponse,
} from "../types/donor";

export async function getDonors(): Promise<Donor[]> {
  const response = await api.get<ApiResponse<Donor[]>>("/Donors");
  return response.data.data;
}

export async function getDonorsPaged(
  pageNumber: number,
  pageSize: number,
  search?: string,
  bloodGroup?: string
): Promise<PagedResponse<Donor[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);
  if (bloodGroup) params.append("bloodGroup", bloodGroup);

  const response = await api.get<PagedResponse<Donor[]>>(
    `/Donors/paged?${params.toString()}`
  );
  return response.data;
}

export async function getDonorById(id: string): Promise<Donor> {
  const response = await api.get<ApiResponse<Donor>>(`/Donors/${id}`);
  return response.data.data;
}

export async function createDonor(data: CreateDonor): Promise<void> {
  await api.post("/Donors", data);
}

export async function updateDonor(
  id: string,
  data: UpdateDonor
): Promise<void> {
  await api.put(`/Donors/${id}`, data);
}

export async function deleteDonor(id: string): Promise<void> {
  await api.delete(`/Donors/${id}`);
}