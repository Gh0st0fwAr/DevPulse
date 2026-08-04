<script setup lang="ts">
import { TASK_STATUS_LABELS, TaskCard, useTaskStore } from "@entities/task";
import type { Task, TaskStatus } from "@entities/task";
import { UiEmpty } from "@shared/ui";
import { computed } from "vue";
import draggable from "vuedraggable";

const props = defineProps<{
  status: TaskStatus;
}>();

const emit = defineEmits<{
  delete: [id: string];
}>();

const taskStore = useTaskStore();

const columnTasks = computed({
  get: () => taskStore.tasksByStatus[props.status],
  set: () => {},
});

type DragChangeEvent = {
  added?: { element: Task };
  moved?: { element: Task };
  removed?: { element: Task };
};

function onColumnChange(event: DragChangeEvent): void {
  if (event.added) {
    taskStore.moveTask(event.added.element.id, props.status);
  }
}
</script>

<template>
  <section
    class="rounded-xl border border-surface-200 bg-surface-100 p-3 dark:border-surface-700 dark:bg-surface-900/40"
  >
    <h3 class="mb-3 text-sm font-medium text-surface-600 dark:text-surface-300">
      {{ TASK_STATUS_LABELS[status] }}
    </h3>

    <draggable
      :list="columnTasks"
      item-key="id"
      group="kanban"
      class="flex min-h-[80px] flex-col gap-2"
      @change="onColumnChange"
    >
      <template #item="{ element: task }">
        <TaskCard :task="task" @delete="(id) => emit('delete', id)" />
      </template>
    </draggable>

    <UiEmpty
      v-if="taskStore.tasksByStatus[status].length === 0"
      title="Пусто"
      description="Перетащи задачу сюда или создай новую"
    />
  </section>
</template>
