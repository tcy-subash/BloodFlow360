import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBloodIssuesPaged,
  getBloodIssueById,
  createBloodIssue,
  updateBloodIssue,
  deleteBloodIssue,
} from "../services/BloodIssueService";
import type { CreateBloodIssue, UpdateBloodIssue } from "../types/bloodissue";

export function useBloodIssuesPaged(
  page: number,
  pageSize: number,
  search?: string
) {
  return useQuery({
    queryKey: ["bloodIssues", "paged", page, pageSize, search],
    queryFn: () => getBloodIssuesPaged(page, pageSize, search),
    placeholderData: (prev) => prev,
  });
}

export function useBloodIssueById(id: string) {
  return useQuery({
    queryKey: ["bloodIssues", id],
    queryFn: () => getBloodIssueById(id),
    enabled: !!id,
  });
}

export function useCreateBloodIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBloodIssue) => createBloodIssue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloodIssues"] });
    },
  });
}

export function useUpdateBloodIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBloodIssue }) =>
      updateBloodIssue(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["bloodIssues"] });
      queryClient.invalidateQueries({ queryKey: ["bloodIssues", variables.id] });
    },
  });
}

export function useDeleteBloodIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteBloodIssue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bloodIssues"] });
    },
  });
}
