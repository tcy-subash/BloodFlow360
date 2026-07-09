import api from "../api/axios";
import type {
  BloodInventory,
  CreateBloodInventory,
  UpdateBloodInventory,
  AdjustmentRequest,
} from "../types/inventory";
import type { ApiResponse, PagedResponse } from "../types/donor";

export interface InventoryHistory {
  id: string;
  transactionNumber: string;
  transactionType: string;
  quantity: number;
  previousStock: number;
  currentStock: number;
  remarks: string;
  createdAt: string;
}

export async function getInventory(): Promise<BloodInventory[]> {
  const response = await api.get<ApiResponse<BloodInventory[]>>("/BloodInventories");
  return response.data.data;
}

export async function getInventoryPaged(
  pageNumber: number,
  pageSize: number,
  search?: string
): Promise<PagedResponse<BloodInventory[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await api.get<PagedResponse<BloodInventory[]>>(
    `/BloodInventories/paged?${params.toString()}`
  );
  return response.data;
}

export async function getInventoryById(id: string): Promise<BloodInventory> {
  const response = await api.get<ApiResponse<BloodInventory>>(`/BloodInventories/${id}`);
  return response.data.data;
}

export async function createInventory(data: CreateBloodInventory): Promise<void> {
  await api.post("/BloodInventories", data);
}

export async function updateInventory(
  id: string,
  data: UpdateBloodInventory
): Promise<void> {
  await api.put(`/BloodInventories/${id}`, data);
}

export async function deleteInventory(id: string): Promise<void> {
  await api.delete(`/BloodInventories/${id}`);
}

// Transaction Endpoints
export async function getInventoryHistory(
  bloodInventoryId: string
): Promise<InventoryHistory[]> {
  const response = await api.get<InventoryHistory[]>(
    `/InventoryTransaction/history/${bloodInventoryId}`
  );
  return response.data;
}

export async function adjustInventory(
  data: AdjustmentRequest
): Promise<void> {
  await api.post("/InventoryTransaction/adjustment", data);
}
