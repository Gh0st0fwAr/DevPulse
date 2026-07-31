<script setup lang="ts">
import type { Note } from '../model/types'

defineProps<{
  note: Note
  active?: boolean
}>()

defineEmits<{
  select: [id: string]
}>()
</script>

<template>
  <button
    type="button"
    class="card w-full text-left"
    :class="{ 'ring-2 ring-accent': active }"
    @click="$emit('select', note.id)"
  >
    <span class="font-medium">{{ note.title }}</span>
    <span class="mt-1 block text-xs text-surface-400">TODO: тег / дата</span>
  </button>
</template>
