import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getHospitals,
  getHospitalsPaged,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} from "../services/HospitalService";
import type { CreateHospital, UpdateHospital } from "../types/hospital";

export function useHospitals() {
  return useQuery({
    queryKey: ["hospitals"],
    queryFn: getHospitals,
  });
}

export function useHospitalsPaged(
  page: number,
  pageSize: number,
  search?: string
) {
  return useQuery({
    queryKey: ["hospitals", "paged", page, pageSize, search],
    queryFn: () => getHospitalsPaged(page, pageSize, search),
    placeholderData: (prev) => prev,
  });
}

export function useHospitalById(id: string) {
  return useQuery({
    queryKey: ["hospitals", id],
    queryFn: () => getHospitalById(id),
    enabled: !!id,
  });
}

export function useCreateHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateHospital) => createHospital(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}

export function useUpdateHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateHospital }) =>
      updateHospital(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
      queryClient.invalidateQueries({ queryKey: ["hospitals", variables.id] });
    },
  });
}

export function useDeleteHospital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHospital(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hospitals"] });
    },
  });
}
