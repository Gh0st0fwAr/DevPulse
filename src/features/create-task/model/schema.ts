import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Заголовок обязателен")
    .max(100, "Слишком длинный заголовок"),
  description: z
    .string()
    .trim()
    .max(500, "Слишком длинное описание")
    .optional()
    .or(z.literal("")),
  tags: z.string().optional(),
  deadline: z.string().optional(),
  plannedSessions: z.coerce
    .number({ invalid_type_error: "Укажи число" })
    .int("Укажи целое число")
    .min(1, "Количество сессий должно быть больше 0")
    .max(50, "Не больше 50 сессий"),
});

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
