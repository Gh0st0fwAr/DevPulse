import { computed, onUnmounted, ref } from 'vue'
import {
  BREAK_SECONDS,
  WORK_SECONDS,
  useTimerStore,
} from '@entities/timer'
import { formatTime } from './utils'

/**
 * TODO: вынеси сюда всю логику помодоро-таймера (по ТЗ — Vue Composable).
 *
 * Нужно:
 * - start / pause / reset
 * - тик каждую секунду
 * - автосмена режима work ↔ break
 * - звук / уведомление по окончании
 * - при завершении work-сессии: incrementCompletedSessions у связанной задачи
 *
 * Сейчас — только каркас, чтобы импорты уже работали.
 */
export function useTimer() {
  const timerStore = useTimerStore()
  const tickId = ref<ReturnType<typeof setInterval> | null>(null)

  const formattedTime = computed(() =>
    formatTime(timerStore.state.remainingSeconds),
  )

  const modeLabel = computed(() =>
    timerStore.state.mode === 'work' ? 'Фокус' : 'Перерыв',
  )

  const isRunning = computed(() => timerStore.state.status === 'running')
  const isPaused = computed(() => timerStore.state.status === 'paused')

  function clearTick(): void {
    if (tickId.value !== null) {
      clearInterval(tickId.value)
      tickId.value = null
    }
  }

  function start(): void {
    // TODO: запустить интервал и менять remainingSeconds
    void WORK_SECONDS
    void BREAK_SECONDS
  }

  function pause(): void {
    // TODO
    clearTick()
  }

  function reset(): void {
    // TODO: вернуть длительность текущего режима
    clearTick()
  }

  function linkTask(taskId: string | null): void {
    timerStore.linkTask(taskId)
  }

  onUnmounted(() => {
    clearTick()
  })

  return {
    state: computed(() => timerStore.state),
    formattedTime,
    modeLabel,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
    linkTask,
  }
}
