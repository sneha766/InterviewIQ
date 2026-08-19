import { z } from "zod";

export const HintsSchema = z.object({
  hints: z.array(z.string()).min(1),
});

export type Hints = z.infer<typeof HintsSchema>;
