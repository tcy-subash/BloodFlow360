import api from "../api/axios";
import type { User, CreateUser, UpdateUser } from "../types/user";
import type { ApiResponse, PagedResponse } from "../types/donor";

export interface RoleDto {
  id: string;
  name: string;
  description: string;
  priority: number;
  isSystemRole: boolean;
}

export async function getUsersPaged(
  pageNumber: number,
  pageSize: number,
  search?: string
): Promise<PagedResponse<User[]>> {
  const params = new URLSearchParams();
  params.append("pageNumber", pageNumber.toString());
  params.append("pageSize", pageSize.toString());
  if (search) params.append("search", search);

  const response = await api.get<PagedResponse<User[]>>(
    `/Users/paged?${params.toString()}`
  );
  return response.data;
}

export async function getUserById(id: string): Promise<User> {
  const response = await api.get<ApiResponse<User>>(`/Users/${id}`);
  return response.data.data;
}

export async function createUser(data: CreateUser): Promise<void> {
  await api.post("/Users", data);
}

export async function updateUser(id: string, data: UpdateUser): Promise<void> {
  await api.put(`/Users/${id}`, data);
}

export async function deleteUser(id: string): Promise<void> {
  await api.delete(`/Users/${id}`);
}

export async function getAllRoles(): Promise<RoleDto[]> {
  const response = await api.get<ApiResponse<RoleDto[]>>("/Roles");
  return response.data.data;
}
