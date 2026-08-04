export type TaskStatus = "backlog" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  tags: string[];
  deadline: string | null;
  plannedSessions: number;
  completedSessions: number;
  createdAt: string;
  completedAt: string | null;
}

export const TASK_STATUSES: readonly TaskStatus[] = [
  "backlog",
  "in_progress",
  "done",
] as const;

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: "Бэклог",
  in_progress: "В работе",
  done: "Готово",
};
