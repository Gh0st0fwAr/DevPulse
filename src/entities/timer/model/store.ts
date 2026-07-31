import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimerMode, TimerState, TimerStatus } from './types'

/** Длительности по ТЗ: 25 мин работа, 5 мин перерыв */
export const WORK_SECONDS = 25 * 60
export const BREAK_SECONDS = 5 * 60

/**
 * TODO: храни здесь «состояние» таймера.
 * Саму логику тиков лучше вынести в composable useTimer (shared/lib или features).
 */
export const useTimerStore = defineStore('timer', () => {
  const state = ref<TimerState>({
    mode: 'work',
    status: 'idle',
    remainingSeconds: WORK_SECONDS,
    linkedTaskId: null,
  })

  function setStatus(_status: TimerStatus): void {
    // TODO
  }

  function setMode(_mode: TimerMode): void {
    // TODO
  }

  function setRemaining(_seconds: number): void {
    // TODO
  }

  function linkTask(_taskId: string | null): void {
    // TODO: только задачи со статусом in_progress
  }

  return {
    state,
    setStatus,
    setMode,
    setRemaining,
    linkTask,
  }
})
