import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Заголовок обязателен"),
  description: z.string().optional(),
  tags: z.string().optional(),
  deadline: z.string().optional(),
  plannedSessions: z.coerce
    .number()
    .min(1, "Количество сессий должно быть больше 0"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
