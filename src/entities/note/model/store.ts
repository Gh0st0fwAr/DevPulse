import { generateId } from "@shared/lib";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { Note } from "./types";

export const useNoteStore = defineStore("notes", () => {
  const notes = useLocalStorage<Note[]>("devpulse.notes", []);
  const selectedId = ref<string | null>(null);

  type AddNotePayload = {
    title: string;
    content?: string;
    tag?: string;
  };

  function selectNote(id: string | null): void {
    if (id !== null && selectedId.value === id) {
      selectedId.value = null;
      return;
    }
    selectedId.value = id;
  }

  function addNote(payload: AddNotePayload): void {
    const title = payload.title.trim();
    if (!title) return;

    const newNote: Note = {
      id: generateId(),
      title,
      content: payload.content?.trim() ?? "",
      tag: payload.tag?.trim() ?? "",
      lastUpdated: new Date().toISOString(),
    };

    notes.value.push(newNote);
  }

  type UpdateNotePayload = Partial<Pick<Note, "title" | "content" | "tag">>;

  function updateNote(id: string, payload: UpdateNotePayload): void {
    const index = notes.value.findIndex((note) => note.id === id);
    if (index === -1) return;

    const note = notes.value[index];

    if (payload.title !== undefined) {
      note.title = payload.title.trim();
    }
    if (payload.content !== undefined) {
      note.content = payload.content;
    }
    if (payload.tag !== undefined) {
      note.tag = payload.tag.trim();
    }

    note.lastUpdated = new Date().toISOString();
  }

  function removeNote(id: string): void {
    const index = notes.value.findIndex((n) => n.id === id);
    if (index === -1) return;

    notes.value.splice(index, 1);

    if (selectedId.value === id) {
      selectedId.value = null;
    }
  }

  function filterByTag(tag: string): Note[] {
    return notes.value.filter((note) => note.tag === tag);
  }

  return {
    notes,
    selectedId,
    selectNote,
    addNote,
    updateNote,
    removeNote,
    filterByTag,
  };
});
