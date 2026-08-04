import { ZodSchema } from "zod";

export async function generateStructuredOutput<T>(
  generator: () => Promise<unknown>,
  schema: ZodSchema<T>
): Promise<T> {
  const response = await generator();
  return schema.parse(response);
}