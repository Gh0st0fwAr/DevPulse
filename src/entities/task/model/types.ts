/**
 * TODO (раздел 3 ТЗ): спроектируй интерфейс Task.
 *
 * По требованиям сущность должна содержать:
 * - id
 * - title
 * - description (опционально)
 * - status
 * - массив тегов
 * - deadline
 * - плановое и фактическое количество сессий фокуса (помодоро)
 * - дата создания и дата завершения
 *
 * Подсказка: статус удобно описать union-типом: 'backlog' | 'in_progress' | 'done'
 */
export type TaskStatus = 'backlog' | 'in_progress' | 'done'

export interface Task {
  id: string,
  title: string,
  description?: string,
  status: TaskStatus,
  tags: string[],
  deadline: string | null
  plannedSessions: number
  completedSessions: number
  createdAt: string
  completedAt: string | null
}

export const TASK_STATUSES: readonly TaskStatus[] = [
  'backlog',
  'in_progress',
  'done',
] as const

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: 'Бэклог',
  in_progress: 'В работе',
  done: 'Готово',
}
