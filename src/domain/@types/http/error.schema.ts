import { z } from 'zod';

export const errorSchema = z.object({
  statusCode: z.number(),
  error: z.string(),
  message: z.string(),
});

export type ErrorSchema = z.infer<typeof errorSchema>;
