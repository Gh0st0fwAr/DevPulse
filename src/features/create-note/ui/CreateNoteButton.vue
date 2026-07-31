<script setup lang="ts">
/**
 * TODO: feature создания заметки (форма / быстрый add).
 * Пока заглушка — подключи к NotesPage, когда дойдёшь до модуля 3.
 */
import { UiButton } from '@shared/ui'

const emit = defineEmits<{
  create: []
}>()
</script>

<template>
  <UiButton @click="emit('create')">Новая заметка</UiButton>
</template>
