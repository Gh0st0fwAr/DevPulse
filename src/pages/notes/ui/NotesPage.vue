<script setup lang="ts">
import { NotesLayout } from "@widgets/notes-layout";
</script>

<template>
  <div class="space-y-2">
    <h1 class="text-2xl font-semibold">Заметки</h1>
    <p class="text-sm text-surface-500 dark:text-surface-400">
      Заметки с Markdown-превью и фильтром по тегам.
    </p>
    <NotesLayout class="mt-4" />
  </div>
</template>
