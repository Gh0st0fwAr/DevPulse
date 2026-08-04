<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
}>()

defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      @click.self="$emit('close')"
    >
      <div
        class="w-full max-w-lg rounded-xl border border-surface-200 bg-white p-4 shadow-xl dark:border-surface-700 dark:bg-surface-800"
        role="dialog"
        aria-modal="true"
      >
        <div class="mb-4 flex items-center justify-between gap-3">
          <h2 v-if="title" class="text-lg font-semibold">{{ title }}</h2>
          <button
            type="button"
            class="text-surface-500 hover:text-surface-800 dark:text-surface-400 dark:hover:text-surface-100"
            @click="$emit('close')"
          >
            ✕
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
