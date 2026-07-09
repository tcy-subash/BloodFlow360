import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getDonors,
  getDonorsPaged,
  createDonor,
  updateDonor,
  deleteDonor,
} from "../services/DonorService";
import type { CreateDonor, UpdateDonor } from "../types/donor";

export function useDonors() {
  return useQuery({
    queryKey: ["donors"],
    queryFn: getDonors,
  });
}

export function useDonorsPaged(
  page: number,
  pageSize: number,
  search?: string,
  bloodGroup?: string
) {
  return useQuery({
    queryKey: ["donors", "paged", page, pageSize, search, bloodGroup],
    queryFn: () => getDonorsPaged(page, pageSize, search, bloodGroup),
    placeholderData: (prev) => prev,
  });
}

export function useCreateDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDonor) => createDonor(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
}

export function useUpdateDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateDonor }) =>
      updateDonor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
}

export function useDeleteDonor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDonor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["donors"] });
    },
  });
}