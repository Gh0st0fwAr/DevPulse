import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Note } from './types'

/**
 * TODO: реализуй store заметок + persistence в localStorage.
 */
export const useNoteStore = defineStore('notes', () => {
  const notes = ref<Note[]>([])
  const selectedId = ref<string | null>(null)

  function selectNote(_id: string | null): void {
    // TODO
  }

  function addNote(_payload: unknown): void {
    // TODO
  }

  function updateNote(_id: string, _payload: unknown): void {
    // TODO
  }

  function removeNote(_id: string): void {
    // TODO
  }

  function filterByTag(_tag: string): Note[] {
    // TODO: фильтрация списка по тегу
    return []
  }

  return {
    notes,
    selectedId,
    selectNote,
    addNote,
    updateNote,
    removeNote,
    filterByTag,
  }
})
