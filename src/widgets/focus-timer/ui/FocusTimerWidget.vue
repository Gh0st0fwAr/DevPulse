<script setup lang="ts">
import { useTimer } from '@shared/lib'
import { UiButton } from '@shared/ui'
import { LinkTimerTaskSelect } from '@features/link-timer-task'
// import { useTimerStore } from '@entities/timer'

// const timerStore = useTimerStore()
/**
 * TODO: виджет фокус-таймера.
 * Подключи useTimer: start/pause/reset, отображение времени и режима.
 * Звук / Notification — в момент завершения сессии.
 */
const {
  formattedTime,
  modeLabel,
  isRunning,
  isPaused,
  start,
  pause,
  reset,
} = useTimer()


// timerStore.setRemaining(10)
// timerStore.setStatus('running')
</script>

<template>
  <section class="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-surface-400">{{ modeLabel }}</p>
      <p class="font-mono text-4xl tracking-wider">{{ formattedTime }}</p>
      <p class="mt-1 text-xs text-surface-500">
        TODO: реализуй тики в useTimer
      </p>
    </div>

    <div class="flex flex-col gap-3 sm:items-end">
      <LinkTimerTaskSelect class="min-w-[220px]" />
      <div class="flex gap-2">
        <UiButton v-if="!isRunning" @click="start">Старт</UiButton>
        <UiButton v-else variant="ghost" @click="pause">Пауза</UiButton>
        <UiButton variant="ghost" :disabled="!isRunning && !isPaused" @click="reset">
          Сброс
        </UiButton>
      </div>
    </div>
  </section>
</template>
