import api from "../lib/axios";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await api.get("/dashboard");
  return response.data.data;
};