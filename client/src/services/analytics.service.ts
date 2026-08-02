import axios from "axios";
import type { AnalyticsResponse } from "../types/analytics";

export const getAnalytics = async (): Promise<AnalyticsResponse> => {
  const { data } = await API.get("/analytics");
  return data.data;
};
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

