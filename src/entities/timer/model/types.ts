/**
 * TODO (раздел 3 ТЗ): спроектируй TimerState.
 *
 * По требованиям описание включает:
 * - оставшееся время
 * - текущий режим (работа / короткий перерыв)
 * - статус активности
 * - связь с текущей задачей (taskId | null)
 */
export type TimerMode = 'work' | 'break'

export type TimerStatus = 'idle' | 'running' | 'paused'

export interface TimerState {
  mode: TimerMode
  status: TimerStatus
  remainingSeconds: number,
  linkedTaskId: string | null
}
