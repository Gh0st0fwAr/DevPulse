<script setup lang="ts">
defineProps<{
  modelValue: string;
  label?: string;
  type?: string;
  error?: string;
  placeholder?: string;
}>();

defineEmits<{
  "update:modelValue": [value: string];
}>();
</script>

<template>
  <label class="flex flex-col gap-1 text-sm">
    <span v-if="label" class="text-surface-600 dark:text-surface-300">{{ label }}</span>
    <input
      class="rounded-lg border border-surface-300 bg-white px-3 py-2 text-surface-900 outline-none focus:ring-2 focus:ring-accent/50 dark:border-surface-600 dark:bg-surface-900 dark:text-surface-100"
      :class="{ 'border-danger focus:ring-danger/50': Boolean(error) }"
      :type="type ?? 'text'"
      :value="modelValue"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" class="text-xs text-danger">{{ error }}</span>
  </label>
</template>
