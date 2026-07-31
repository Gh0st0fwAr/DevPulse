<script setup lang="ts">
import { RouterView } from 'vue-router'
import { AppHeader } from '@widgets/app-header'
import { FocusTimerWidget } from '@widgets/focus-timer'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <!-- Глобальный виджет таймера: по ТЗ может быть на отдельной странице ИЛИ сквозным -->
    <FocusTimerWidget class="mx-4 mt-4 sm:mx-6 lg:mx-8" />

    <main class="page-container flex-1">
      <RouterView />
    </main>
  </div>
</template>
