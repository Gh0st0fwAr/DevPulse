<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'button' | 'submit'
    variant?: 'primary' | 'ghost' | 'danger'
    disabled?: boolean
  }>(),
  {
    type: 'button',
    variant: 'primary',
    disabled: false,
  },
)
</script>

<template>
  <!-- TODO: стилизуй варианты через Tailwind; используй слот для текста -->
  <button
    :type="type"
    class="rounded-lg px-3 py-2 text-sm font-medium transition"
    :class="{
      'bg-accent text-surface-950 hover:bg-accent-hover': variant === 'primary',
      'bg-transparent text-surface-200 hover:bg-surface-800': variant === 'ghost',
      'bg-danger/20 text-danger hover:bg-danger/30': variant === 'danger',
      'cursor-not-allowed opacity-50': disabled,
    }"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
