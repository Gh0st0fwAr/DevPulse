<script setup lang="ts">
/**
 * TODO: двусторонний v-model (modelValue + update:modelValue),
 * label, type, error-сообщение — по acceptance criteria ТЗ.
 */
defineProps<{
  modelValue: string
  label?: string
  type?: string
  error?: string
  placeholder?: string
}>()

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>

<template>
  <label class="flex flex-col gap-1 text-sm">
    <span v-if="label" class="text-surface-300">{{ label }}</span>
    <input
      class="rounded-lg border border-surface-600 bg-surface-900 px-3 py-2 outline-none focus:ring-2 focus:ring-accent/50"
      :class="{ 'border-danger focus:ring-danger/50': Boolean(error) }"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="text-xs text-danger">{{ error }}</span>
  </label>
</template>
