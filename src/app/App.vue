<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppHeader } from '@widgets/app-header'
import { FocusTimerWidget } from '@widgets/focus-timer'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <!-- Глобальный виджет таймера: по ТЗ может быть на отдельной странице ИЛИ сквозным -->
    <div class="page-container py-4">
      <FocusTimerWidget />
    </div>

    <main class="page-container flex-1 pt-0">
      <RouterView />
    </main>
  </div>
</template>
