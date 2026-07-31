<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <!-- TODO: пустое состояние колонок / списков по ТЗ -->
  <div class="rounded-xl border border-dashed border-surface-600 p-6 text-center text-surface-400">
    <p class="font-medium text-surface-200">{{ title ?? 'Пока пусто' }}</p>
    <p v-if="description" class="mt-1 text-sm">{{ description }}</p>
    <div class="mt-3">
      <slot />
    </div>
  </div>
</template>
