import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { TimerMode, TimerState, TimerStatus } from './types'
import { useTaskStore } from '@entities/task'

/** Длительности по ТЗ: 25 мин работа, 5 мин перерыв */
// export const WORK_SECONDS = 25 * 60
export const WORK_SECONDS = 5
export const BREAK_SECONDS = 5
// export const BREAK_SECONDS = 5 * 60

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
    state.value.status = _status;
  }

  function setMode(_mode: TimerMode): void {
    // TODO
    state.value.mode = _mode;
  }

  function setRemaining(_seconds: number): void {
    // TODO
    state.value.remainingSeconds = _seconds;
  }

  function linkTask(_taskId: string | null): void {
    // TODO: только задачи со статусом in_progress
    // state.value.linkedTaskId = _taskId;
    if (_taskId === null) {
      state.value.linkedTaskId = null;
    } else {
      const task = useTaskStore().getTaskById(_taskId);
      if (!task) return;
      if (task.status === 'in_progress') {
        state.value.linkedTaskId = _taskId;
      }
    }

  }

  return {
    state,
    setStatus,
    setMode,
    setRemaining,
    linkTask,
  }
})
