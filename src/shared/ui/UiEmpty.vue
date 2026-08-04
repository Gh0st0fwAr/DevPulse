<script setup lang="ts">
defineProps<{
  title?: string;
  description?: string;
}>();
</script>

<template>
  <div
    class="rounded-xl border border-dashed border-surface-300 p-6 text-center text-surface-500 dark:border-surface-600 dark:text-surface-400"
  >
    <p class="font-medium text-surface-700 dark:text-surface-200">{{ title ?? 'Пока пусто' }}</p>
    <p v-if="description" class="mt-1 text-sm">{{ description }}</p>
    <div class="mt-3">
      <slot />
    </div>
  </div>
</template>
