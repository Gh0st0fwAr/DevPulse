<script setup lang="ts">
import { KanbanBoard } from "@widgets/kanban-board";
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Задачи</h1>
    <p class="text-sm text-surface-500 dark:text-surface-400">
      Канбан-доска: создавай задачи, перетаскивай между колонками и отслеживай прогресс.
    </p>
    <KanbanBoard class="mt-4" />
  </div>
</template>
