<script setup lang="ts">
import { useTaskStore } from "@entities/task";
import { useTimerStore } from "@entities/timer";
import { computed } from "vue";

const taskStore = useTaskStore();
const timerStore = useTimerStore();

const inProgressTasks = computed(() => taskStore.tasksByStatus.in_progress);

function onChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value;

  if (value === "") {
    timerStore.setLinkedTaskId(null);
    return;
  }

  const task = taskStore.getTaskById(value);
  if (task?.status === "in_progress") {
    timerStore.setLinkedTaskId(value);
  }
}
</script>

<template>
  <label class="flex flex-col gap-1 text-sm">
    <span class="text-surface-600 dark:text-surface-300">Задача для фокуса</span>
    <select
      class="rounded-lg border border-surface-300 bg-white px-3 py-2 text-surface-900 dark:border-surface-600 dark:bg-surface-900 dark:text-surface-100"
      :value="timerStore.state.linkedTaskId ?? ''"
      @change="onChange"
    >
      <option value="">Без задачи</option>
      <option v-for="task in inProgressTasks" :key="task.id" :value="task.id">
        {{ task.title }}
      </option>
    </select>
  </label>
</template>
