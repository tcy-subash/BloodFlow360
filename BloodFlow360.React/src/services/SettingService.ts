import api from "../api/axios";
import type { Setting, CreateSetting, UpdateSetting } from "../types/setting";
import type { ApiResponse, PagedResponse } from "../types/donor";

export async function getSettings(): Promise<Setting[]> {
  const response = await api.get<ApiResponse<Setting[]>>("/Settings");
  return response.data.data;
}

export async function getSettingsPaged(
  pageNumber: number,
  pageSize: number,
  search?: string
): Promise<PagedResponse<Setting[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await api.get<PagedResponse<Setting[]>>(
    `/Settings/paged?${params.toString()}`
  );
  return response.data;
}

export async function getSettingByKey(key: string): Promise<Setting> {
  const response = await api.get<ApiResponse<Setting>>(`/Settings/key/${key}`);
  return response.data.data;
}

export async function createSetting(data: CreateSetting): Promise<void> {
  await api.post("/Settings", data);
}

export async function updateSetting(
  id: string,
  data: UpdateSetting
): Promise<void> {
  await api.put(`/Settings/${id}`, data);
}

export async function updateSettingByKey(
  key: string,
  value: string
): Promise<void> {
  await api.post("/Settings/update-key", { key, value });
}
