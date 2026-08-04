<script setup lang="ts">
/**
 * Страница таймера.
 * Сквозной виджет уже в App.vue — здесь можно сделать расширенный UI
 * или продублировать FocusTimerWidget для отдельного маршрута /timer.
 */
import { FocusTimerWidget } from '@widgets/focus-timer'
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Фокус-таймер</h1>
    <p class="text-sm text-surface-500 dark:text-surface-400">
      Модуль 2 ТЗ: помодоро 25/5, composable useTimer, связь с задачей.
    </p>
    <FocusTimerWidget class="mt-4" />
  </div>
</template>
