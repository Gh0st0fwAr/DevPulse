<script setup lang="ts">
import { useTaskStore } from "@entities/task";
import { LinkTimerTaskSelect } from "@features/link-timer-task";
import { useRunTimer } from "@features/run-timer";
import { UiButton } from "@shared/ui";
import { computed } from "vue";

const taskStore = useTaskStore();
const {
  formattedTime,
  modeLabel,
  isRunning,
  isPaused,
  start,
  pause,
  reset,
  state,
} = useRunTimer();

const linkedTaskTitle = computed(() => {
  const id = state.value.linkedTaskId;
  if (!id) return null;
  return taskStore.getTaskById(id)?.title ?? null;
});
</script>

<template>
  <section class="card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-surface-500 dark:text-surface-400">{{ modeLabel }}</p>
      <p class="font-mono text-4xl tracking-wider">{{ formattedTime }}</p>
      <p v-if="linkedTaskTitle" class="mt-1 text-xs text-surface-500 dark:text-surface-400">
        Задача: {{ linkedTaskTitle }}
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
