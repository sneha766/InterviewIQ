import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createInterview,
  submitInterview,
  getInterviewHistory,
  getInterviewById,
  deleteInterview,
} from "@/services/interview.service";
import type {
  CreateInterviewPayload,
  SubmitInterviewPayload,
} from "@/services/interview.service";

export function useInterviewHistory() {
  return useQuery({
    queryKey: ["interview-history"],
    queryFn: getInterviewHistory,
  });
}

export function useInterview(id: string) {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: () => getInterviewById(id),
    enabled: !!id,
  });
}

export function useCreateInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateInterviewPayload) => createInterview(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-history"] });
    },
  });
}

export function useSubmitInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: SubmitInterviewPayload;
    }) => submitInterview(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-history"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-data"] });
      queryClient.invalidateQueries({ queryKey: ["analytics-data"] });
    },
  });
}

export function useDeleteInterview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteInterview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interview-history"] });
    },
  });
}
