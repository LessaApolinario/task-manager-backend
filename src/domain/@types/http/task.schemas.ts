import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string(),
  description: z.string().optional().default(''),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
  user_id: z.string(),
  category_id: z.string().optional().default(''),
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;

export const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional().default(''),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED']).default('PENDING'),
  user_id: z.string(),
  category_id: z.string().optional().default(''),
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
