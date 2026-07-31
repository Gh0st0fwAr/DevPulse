<script setup lang="ts">
import { KanbanBoard } from '@widgets/kanban-board'
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Задачи</h1>
    <p class="text-sm text-surface-400">
      Модуль 1 ТЗ: канбан, создание, удаление, drag-and-drop.
    </p>
    <KanbanBoard class="mt-4" />
  </div>
</template>
