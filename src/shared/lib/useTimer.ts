import { computed, onUnmounted, ref } from 'vue'
import { useTaskStore } from '@entities/task'
import {
  BREAK_SECONDS,
  WORK_SECONDS,
  useTimerStore,
} from '@entities/timer'
import type { TimerMode } from '@entities/timer'
import { formatTime } from './utils'

function durationForMode(mode: TimerMode): number {
  return mode === 'work' ? WORK_SECONDS : BREAK_SECONDS
}

function playEndSound(): void {
  try {
    const audioContext = new AudioContext()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()

    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    oscillator.frequency.value = 880
    gain.gain.value = 0.08
    oscillator.start()
    oscillator.stop(audioContext.currentTime + 0.2)
  } catch {
    // Браузер может заблокировать AudioContext без жеста пользователя
  }
}

function notifySessionComplete(mode: TimerMode): void {
  playEndSound()

  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (Notification.permission !== 'granted') return

  const title = mode === 'work' ? 'Фокус-сессия завершена' : 'Перерыв завершён'
  const body =
    mode === 'work'
      ? 'Пора на короткий перерыв.'
      : 'Можно снова переключиться на работу.'

  new Notification(title, { body })
}

export function useTimer() {
  const timerStore = useTimerStore()
  const taskStore = useTaskStore()
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

  function completeSession(): void {
    const currentMode = timerStore.state.mode

    if (currentMode === 'work' && timerStore.state.linkedTaskId) {
      taskStore.incrementCompletedSessions(timerStore.state.linkedTaskId)
    }

    notifySessionComplete(currentMode)

    const nextMode: TimerMode = currentMode === 'work' ? 'break' : 'work'
    timerStore.setMode(nextMode)
    timerStore.setRemaining(durationForMode(nextMode))
    timerStore.setStatus('running')
  }

  function tick(): void {
    const nextRemaining = timerStore.state.remainingSeconds - 1

    if (nextRemaining <= 0) {
      completeSession()
      return
    }

    timerStore.setRemaining(nextRemaining)
  }

  function start(): void {
    if (timerStore.state.status === 'running') return

    if (
      typeof window !== 'undefined' &&
      'Notification' in window &&
      Notification.permission === 'default'
    ) {
      void Notification.requestPermission()
    }

    clearTick()
    timerStore.setStatus('running')
    tickId.value = setInterval(tick, 1000)
  }

  function pause(): void {
    clearTick()
    timerStore.setStatus('paused')
  }

  function reset(): void {
    clearTick()
    timerStore.setRemaining(durationForMode(timerStore.state.mode))
    timerStore.setStatus('idle')
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
