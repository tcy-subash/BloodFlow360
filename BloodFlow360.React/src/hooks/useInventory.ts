import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getInventory,
  getInventoryPaged,
  getInventoryById,
  createInventory,
  updateInventory,
  deleteInventory,
  getInventoryHistory,
  adjustInventory,
} from "../services/InventoryService";
import type { CreateBloodInventory, UpdateBloodInventory, AdjustmentRequest } from "../types/inventory";

export function useInventory() {
  return useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });
}

export function useInventoryPaged(
  page: number,
  pageSize: number,
  search?: string
) {
  return useQuery({
    queryKey: ["inventory", "paged", page, pageSize, search],
    queryFn: () => getInventoryPaged(page, pageSize, search),
    placeholderData: (prev) => prev,
  });
}

export function useInventoryById(id: string) {
  return useQuery({
    queryKey: ["inventory", id],
    queryFn: () => getInventoryById(id),
    enabled: !!id,
  });
}

export function useCreateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBloodInventory) => createInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}

export function useUpdateInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBloodInventory }) =>
      updateInventory(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", variables.id] });
    },
  });
}

export function useDeleteInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInventory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });
}

export function useInventoryHistory(bloodInventoryId: string) {
  return useQuery({
    queryKey: ["inventory", "history", bloodInventoryId],
    queryFn: () => getInventoryHistory(bloodInventoryId),
    enabled: !!bloodInventoryId,
  });
}

export function useAdjustInventory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: AdjustmentRequest) => adjustInventory(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      queryClient.invalidateQueries({ queryKey: ["inventory", variables.bloodInventoryId] });
      queryClient.invalidateQueries({ queryKey: ["inventory", "history", variables.bloodInventoryId] });
    },
  });
}
