import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsersPaged,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllRoles,
} from "../services/UserService";
import type { CreateUser, UpdateUser } from "../types/user";

export function useUsersPaged(page: number, pageSize: number, search?: string) {
  return useQuery({
    queryKey: ["users", "paged", page, pageSize, search],
    queryFn: () => getUsersPaged(page, pageSize, search),
    placeholderData: (prev) => prev,
  });
}

export function useUserById(id: string) {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateUser) => createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUser }) =>
      updateUser(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

export function useAllRoles() {
  return useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
  });
}
