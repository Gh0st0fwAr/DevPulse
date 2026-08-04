<script setup lang="ts">
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TaskCard,
  useTaskStore,
} from "@entities/task";
import type { TaskStatus } from "@entities/task";
import type { Task } from "@entities/task";
import { CreateTaskModal } from "@features/create-task";
import { UiButton, UiEmpty } from "@shared/ui";
import { ref } from "vue";
import draggable from "vuedraggable";

/**
 * TODO: Kanban-доска.
 * - три колонки по TASK_STATUSES
 * - Drag-and-Drop (native HTML5 или vuedraggable — библиотека уже в package.json)
 * - пустые колонки → UiEmpty
 * - удаление через emit карточки → taskStore.removeTask
 */
const taskStore = useTaskStore();
const isCreateOpen = ref(false);

type DragChangeEvent = {
  added?: { element: Task };
  moved?: { element: Task };
  removed?: { element: Task };
};

function onColumnChange(
  targetStatus: TaskStatus,
  event: DragChangeEvent,
): void {
  if (event.added) {
    taskStore.moveTask(event.added.element.id, targetStatus);
  }
}

function onDelete(id: string): void {
  taskStore.removeTask(id);
}
</script>

<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between gap-3">
      <h2 class="text-lg font-semibold">Канбан</h2>
      <UiButton @click="isCreateOpen = true">Новая задача</UiButton>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <section
        v-for="status in TASK_STATUSES"
        :key="status"
        class="rounded-xl border border-surface-200 bg-surface-100 p-3 dark:border-surface-700 dark:bg-surface-900/40"
      >
        <h3 class="mb-3 text-sm font-medium text-surface-600 dark:text-surface-300">
          {{ TASK_STATUS_LABELS[status] }}
        </h3>

        <draggable
          :list="taskStore.getByStatus(status)"
          item-key="id"
          group="kanban"
          class="flex min-h-[80px] flex-col gap-2"
          @change="(event) => onColumnChange(status, event)"
        >
          <template #item="{ element: task }">
            <TaskCard :task="task" @delete="onDelete" />
          </template>
        </draggable>

        <UiEmpty
          v-if="taskStore.getByStatus(status).length === 0"
          title="Пусто"
          description="Перетащи задачу сюда или создай новую"
        />
      </section>
    </div>

    <CreateTaskModal v-model:open="isCreateOpen" />
  </div>
</template>
