import { z } from "zod";

export const RunCodeSchema = z.object({
  language: z.string().min(1),
  code: z.string().min(1),
  input: z.string().optional(),
});

export type RunCodeInput = z.infer<typeof RunCodeSchema>;