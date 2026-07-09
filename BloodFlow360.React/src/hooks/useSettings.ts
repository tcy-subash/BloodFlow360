import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSettings,
  getSettingsPaged,
  getSettingByKey,
  createSetting,
  updateSetting,
  updateSettingByKey,
} from "../services/SettingService";
import type { CreateSetting, UpdateSetting } from "../types/setting";

export function useSettings() {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
}

export function useSettingsPaged(
  page: number,
  pageSize: number,
  search?: string
) {
  return useQuery({
    queryKey: ["settings", "paged", page, pageSize, search],
    queryFn: () => getSettingsPaged(page, pageSize, search),
    placeholderData: (prev) => prev,
  });
}

export function useSettingByKey(key: string) {
  return useQuery({
    queryKey: ["settings", "key", key],
    queryFn: () => getSettingByKey(key),
    enabled: !!key,
  });
}

export function useCreateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSetting) => createSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSetting }) =>
      updateSetting(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}

export function useUpdateSettingByKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ key, value }: { key: string; value: string }) =>
      updateSettingByKey(key, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
  });
}
