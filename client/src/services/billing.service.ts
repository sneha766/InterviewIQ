import api from "../lib/axios";

export interface BillingUsage {
  plan: "FREE" | "PRO";

  resumeAnalyses: number;
  resumeLimit: number | null;

  interviews: number;
  interviewLimit: number | null;

  tailorRequests: number;
  tailorLimit: number | null;
}

export const getUsage = async (): Promise<BillingUsage> => {
  const { data } = await api.get("/billing/usage");

  return data.data;
};

export const createCheckout = async (): Promise<string> => {
  const { data } = await api.post("/billing/checkout");

  return data.url;
};

export const verifyCheckout = async (
  sessionId: string
) => {
  const { data } = await api.get(
    `/billing/verify`,
    {
      params: {
        session_id: sessionId,
      },
    }
  );

  return data;
};