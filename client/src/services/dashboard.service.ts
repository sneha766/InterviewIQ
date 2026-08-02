import axios from "axios";
import type { DashboardResponse } from "../types/dashboard";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

export const getDashboard = async (): Promise<DashboardResponse> => {
  const response = await API.get("/dashboard");
  return response.data.data;
};