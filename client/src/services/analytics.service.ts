import api from "@/lib/axios";
import type { AnalyticsResponse } from "../types/analytics";

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const { data } = await api.get("/analytics");
  return data.data;
};
