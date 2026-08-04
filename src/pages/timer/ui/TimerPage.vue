<script setup lang="ts">
import { useTaskStore } from "@entities/task";
import { useRunTimer } from "@features/run-timer";
import { computed } from "vue";

const { formattedTime, modeLabel, isRunning, isPaused, state } = useRunTimer();
const taskStore = useTaskStore();

const linkedTaskTitle = computed(() => {
  const id = state.value.linkedTaskId;
  if (!id) return null;
  return taskStore.getTaskById(id)?.title ?? null;
});

const statusHint = computed(() => {
  if (isRunning.value) return "Таймер идёт — управление в панели выше.";
  if (isPaused.value) return "Таймер на паузе — управление в панели выше.";
  return "Запусти фокус-сессию в панели таймера вверху страницы.";
});
</script>

<template>
  <div class="space-y-4">
    <div>
      <h1 class="text-2xl font-semibold">Фокус-таймер</h1>
      <p class="text-sm text-surface-500 dark:text-surface-400">
        Помодоро 25/5 с привязкой к задаче в работе.
      </p>
    </div>

    <section class="card space-y-3">
      <p class="text-sm text-surface-500 dark:text-surface-400">{{ statusHint }}</p>
      <div class="flex flex-wrap items-baseline gap-3">
        <span class="text-sm text-surface-600 dark:text-surface-300">{{ modeLabel }}</span>
        <span class="font-mono text-3xl tracking-wider">{{ formattedTime }}</span>
      </div>
      <p v-if="linkedTaskTitle" class="text-sm text-surface-500 dark:text-surface-400">
        Связанная задача: {{ linkedTaskTitle }}
      </p>
    </section>
  </div>
</template>
