<script setup lang="ts">
import { computed, ref } from 'vue'
import { NoteListItem, useNoteStore } from '@entities/note'
import { CreateNoteButton } from '@features/create-note'
import { NotesTagFilter } from '@features/filter-notes'
import { renderMarkdown } from '@shared/lib'
import { UiEmpty, UiInput } from '@shared/ui'

/**
 * TODO: Master-Detail layout для заметок.
 * Слева список + фильтр, справа просмотр/редактирование Markdown.
 */
const noteStore = useNoteStore()
const tagFilter = ref('')

const filteredNotes = computed(() => {
  if (!tagFilter.value.trim()) return noteStore.notes
  return noteStore.filterByTag(tagFilter.value.trim())
})

const selected = computed(() =>
  noteStore.notes.find((note) => note.id === noteStore.selectedId) ?? null,
)

const previewHtml = computed(() =>
  selected.value
    ? renderMarkdown('TODO: возьми markdown-поле выбранной заметки')
    : '',
)

function onCreate(): void {
  // TODO: noteStore.addNote(…)
}
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-[280px_1fr]">
    <aside class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <h2 class="font-semibold">Заметки</h2>
        <CreateNoteButton @create="onCreate" />
      </div>
      <NotesTagFilter v-model="tagFilter" />

      <div class="flex flex-col gap-2">
        <NoteListItem
          v-for="note in filteredNotes"
          :key="note.id"
          :note="note"
          :active="note.id === noteStore.selectedId"
          @select="noteStore.selectNote"
        />
        <UiEmpty v-if="filteredNotes.length === 0" title="Нет заметок" />
      </div>
    </aside>

    <section class="card min-h-[320px]">
      <template v-if="selected">
        <!-- TODO: редактирование title/content + live preview -->
        <UiInput :model-value="selected.title" label="Заголовок" @update:model-value="() => {}" />
        <div class="markdown-body mt-4 text-sm text-surface-300" v-html="previewHtml" />
      </template>
      <UiEmpty v-else title="Выбери заметку" description="Или создай новую слева" />
    </section>
  </div>
</template>
