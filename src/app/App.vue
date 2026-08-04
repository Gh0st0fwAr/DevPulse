<script setup lang="ts">
import { useTimerTaskSync } from "@features/run-timer";
import { AppHeader } from "@widgets/app-header";
import { FocusTimerWidget } from "@widgets/focus-timer";
import { RouterView } from "vue-router";

useTimerTaskSync();
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <div class="page-container py-4">
      <FocusTimerWidget />
    </div>

    <main class="page-container flex-1 pt-0">
      <RouterView />
    </main>
  </div>
</template>
