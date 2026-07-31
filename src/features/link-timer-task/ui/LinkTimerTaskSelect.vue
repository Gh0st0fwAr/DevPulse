<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '@entities/task'
import { useTimer } from '@shared/lib'

/**
 * TODO: связать таймер с задачей из колонки «В работе».
 * Показывать только tasks со status === 'in_progress'.
 */
const taskStore = useTaskStore()
const { linkTask, state } = useTimer()

const inProgressTasks = computed(() =>
  // TODO: когда допишешь поля Task и store — здесь будет реальный список
  taskStore.tasks.filter((task) => task.status === 'in_progress'),
)

function onChange(event: Event): void {
  const value = (event.target as HTMLSelectElement).value
  linkTask(value === '' ? null : value)
}
</script>

<template>
  <label class="flex flex-col gap-1 text-sm">
    <span class="text-surface-300">Задача для фокуса</span>
    <select
      class="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2"
      :value="state.linkedTaskId ?? ''"
      @change="onChange"
    >
      <option value="">Без задачи</option>
      <option v-for="task in inProgressTasks" :key="task.id" :value="task.id">
        {{ task.title }}
      </option>
    </select>
  </label>
</template>
