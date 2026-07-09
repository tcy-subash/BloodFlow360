import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getRequestsPaged,
  getRequestById,
  createRequest,
  updateRequest,
  deleteRequest,
  approveRequest,
  rejectRequest,
  issueRequest,
  getWorkflowStatus,
} from "../services/RequestService";
import type { CreateBloodRequest, UpdateBloodRequest, BloodRequestApproval, BloodRequestRejection, BloodRequestIssue } from "../types/request";

export function useRequestsPaged(
  page: number,
  pageSize: number,
  search?: string,
  status?: string
) {
  return useQuery({
    queryKey: ["requests", "paged", page, pageSize, search, status],
    queryFn: () => getRequestsPaged(page, pageSize, search, status),
    placeholderData: (prev) => prev,
  });
}

export function useRequestById(id: string) {
  return useQuery({
    queryKey: ["requests", id],
    queryFn: () => getRequestById(id),
    enabled: !!id,
  });
}

export function useCreateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateBloodRequest) => createRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useUpdateRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBloodRequest }) =>
      updateRequest(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests", variables.id] });
    },
  });
}

export function useDeleteRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRequest(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
    },
  });
}

export function useApproveRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BloodRequestApproval) => approveRequest(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests", variables.requestId] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] }); // Invalidate inventory as stock levels change
    },
  });
}

export function useRejectRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BloodRequestRejection) => rejectRequest(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests", variables.requestId] });
    },
  });
}

export function useIssueRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BloodRequestIssue) => issueRequest(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["requests"] });
      queryClient.invalidateQueries({ queryKey: ["requests", variables.requestId] });
      queryClient.invalidateQueries({ queryKey: ["inventory"] }); // Invalidate inventory as stock is deducted
    },
  });
}

export function useWorkflowStatus(requestId: string) {
  return useQuery({
    queryKey: ["requests", "workflow-status", requestId],
    queryFn: () => getWorkflowStatus(requestId),
    enabled: !!requestId,
  });
}
