<script setup lang="ts">
import { TASK_STATUSES, useTaskStore } from "@entities/task";
import { CreateTaskModal } from "@features/create-task";
import { UiButton } from "@shared/ui";
import { ref } from "vue";
import KanbanColumn from "./KanbanColumn.vue";

const taskStore = useTaskStore();
const isCreateOpen = ref(false);

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
      <KanbanColumn
        v-for="status in TASK_STATUSES"
        :key="status"
        :status="status"
        @delete="onDelete"
      />
    </div>

    <CreateTaskModal v-model:open="isCreateOpen" />
  </div>
</template>
