<script setup lang="ts">
import { formatDate } from "@shared/lib";
import type { Task } from "../model/types";

defineProps<{
  task: Task;
}>();

defineEmits<{
  delete: [id: string];
}>();
</script>

<template>
  <article class="card">
    <h3 class="font-medium">{{ task.title }}</h3>

    <p v-if="task.description" class="mt-1 text-sm text-surface-500 dark:text-surface-400">
      {{ task.description }}
    </p>

    <div v-if="task.tags.length > 0" class="mt-2 flex flex-wrap gap-1">
      <span
        v-for="tag in task.tags"
        :key="tag"
        class="rounded-full bg-surface-200 px-2 py-0.5 text-xs text-surface-700 dark:bg-surface-700 dark:text-surface-200"
      >
        {{ tag }}
      </span>
    </div>

    <p class="mt-2 text-xs text-surface-500 dark:text-surface-400">
      Дедлайн: {{ formatDate(task.deadline) }}
    </p>

    <p class="mt-1 text-xs text-surface-500 dark:text-surface-400">
      Сессии: {{ task.completedSessions }} / {{ task.plannedSessions }}
    </p>

    <button
      type="button"
      class="mt-3 text-sm text-danger hover:underline"
      @click="$emit('delete', task.id)"
    >
      Удалить
    </button>
  </article>
</template>
