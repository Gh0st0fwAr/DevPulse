<script setup lang="ts">
import { NoteListItem, useNoteStore } from "@entities/note";
import { CreateNoteButton } from "@features/create-note";
import { NotesTagFilter } from "@features/filter-notes";
import { renderMarkdown } from "@shared/lib";
import { UiButton, UiEmpty, UiInput } from "@shared/ui";
import { computed, ref } from "vue";

const noteStore = useNoteStore();
const tagFilter = ref("");

const filteredNotes = computed(() => {
  if (!tagFilter.value.trim()) return noteStore.notes;
  return noteStore.filterByTag(tagFilter.value.trim());
});

const selected = computed(
  () =>
    noteStore.notes.find((note) => note.id === noteStore.selectedId) ?? null,
);

const previewHtml = computed(() =>
  selected.value ? renderMarkdown(selected.value.content) : "",
);

function onCreate(): void {
  noteStore.addNote({ title: "Без названия" });
  const last = noteStore.notes[noteStore.notes.length - 1];
  if (last) noteStore.selectNote(last.id);
}

function onTitleChange(value: string): void {
  if (!selected.value) return;
  noteStore.updateNote(selected.value.id, { title: value });
}

function onContentChange(value: string): void {
  if (!selected.value) return;
  noteStore.updateNote(selected.value.id, { content: value });
}

function onTagChange(value: string): void {
  if (!selected.value) return;
  noteStore.updateNote(selected.value.id, { tag: value });
}

function onDelete(): void {
  if (!selected.value) return;
  noteStore.removeNote(selected.value.id);
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
        <div class="mb-4 flex items-center justify-between gap-2">
          <h3 class="font-medium">Редактирование</h3>
          <UiButton variant="danger" @click="onDelete">Удалить</UiButton>
        </div>

        <div class="space-y-3">
          <UiInput
            :model-value="selected.title"
            label="Заголовок"
            @update:model-value="onTitleChange"
          />

          <UiInput
            :model-value="selected.content"
            label="Контент (Markdown)"
            @update:model-value="onContentChange"
          />

          <UiInput
            :model-value="selected.tag"
            label="Тег"
            placeholder="например: vue"
            @update:model-value="onTagChange"
          />
        </div>

        <div
          class="prose prose-sm mt-4 max-w-none dark:prose-invert"
          v-html="previewHtml"
        />
      </template>
      <UiEmpty v-else title="Выбери заметку" description="Или создай новую слева" />
    </section>
  </div>
</template>
