<script setup lang="ts">
import { APP_NAME, ROUTES } from "@shared/config";
import { useTheme } from "@shared/lib";
import { UiButton } from "@shared/ui";
import { RouterLink } from "vue-router";

const { isDark, toggleTheme } = useTheme();
</script>

<template>
  <header
    class="w-full border-b border-surface-200 bg-white/95 backdrop-blur dark:border-surface-800 dark:bg-surface-900/95"
  >
    <div class="page-container flex w-full items-center justify-between gap-4 py-4">
      <RouterLink
        :to="ROUTES.tasks"
        class="shrink-0 text-xl font-semibold tracking-tight text-accent"
      >
        {{ APP_NAME }}
      </RouterLink>

      <div class="flex items-center gap-4">
        <nav class="flex gap-4 text-sm">
          <RouterLink
            :to="ROUTES.tasks"
            class="text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-50"
            active-class="!text-accent"
          >
            Задачи
          </RouterLink>
          <RouterLink
            :to="ROUTES.timer"
            class="text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-50"
            active-class="!text-accent"
          >
            Таймер
          </RouterLink>
          <RouterLink
            :to="ROUTES.notes"
            class="text-surface-600 hover:text-surface-900 dark:text-surface-300 dark:hover:text-surface-50"
            active-class="!text-accent"
          >
            Заметки
          </RouterLink>
        </nav>

        <UiButton
          variant="ghost"
          :aria-label="isDark ? 'Включить светлую тему' : 'Включить тёмную тему'"
          @click="toggleTheme()"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </UiButton>
      </div>
    </div>
  </header>
</template>
