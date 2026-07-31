<script setup lang="ts">
/**
 * TODO: модальное окно со слотом под контент.
 * Закрытие по клику на оверлей / Escape — хорошее UX-упражнение.
 */
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
      <div class="card w-full max-w-lg" role="dialog" aria-modal="true">
        <div class="mb-4 flex items-center justify-between gap-3">
          <h2 v-if="title" class="text-lg font-semibold">{{ title }}</h2>
          <button type="button" class="text-surface-400 hover:text-surface-100" @click="$emit('close')">
            ✕
          </button>
        </div>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
