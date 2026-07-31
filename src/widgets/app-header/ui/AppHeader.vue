<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { APP_NAME, ROUTES } from '@shared/config'
</script>

<template>
  <header class="border-b border-surface-800 bg-surface-900/80 backdrop-blur">
    <div class="page-container flex items-center justify-between gap-4 py-4">
      <RouterLink :to="ROUTES.tasks" class="text-xl font-semibold tracking-tight text-accent">
        {{ APP_NAME }}
      </RouterLink>

      <nav class="flex gap-4 text-sm">
        <RouterLink
          :to="ROUTES.tasks"
          class="text-surface-300 hover:text-surface-50"
          active-class="!text-accent"
        >
          Задачи
        </RouterLink>
        <RouterLink
          :to="ROUTES.timer"
          class="text-surface-300 hover:text-surface-50"
          active-class="!text-accent"
        >
          Таймер
        </RouterLink>
        <RouterLink
          :to="ROUTES.notes"
          class="text-surface-300 hover:text-surface-50"
          active-class="!text-accent"
        >
          Заметки
        </RouterLink>
      </nav>
    </div>
  </header>
</template>
