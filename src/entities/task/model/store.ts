import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
// import { ref } from "vue";
import type { Task, TaskStatus } from "./types";

/**
 * TODO: реализуй store задач.
 *
 * Что нужно по ТЗ:
 * - список задач
 * - создание / удаление / смена статуса
 * - persistence в localStorage (например через useLocalStorage из @vueuse/core)
 * - при переносе в "done" фиксировать дату завершения
 */
export const useTaskStore = defineStore("tasks", () => {
  const tasks = useLocalStorage<Task[]>("devpulse.tasks", []);

  function getByStatus(_status: TaskStatus): Task[] {
    // TODO: отфильтруй tasks по статусу
    return tasks.value.filter((task) => task.status === _status);
    // return []
  }

  function getTaskById(_id: string): Task | undefined {
    return tasks.value.find((task) => task.id === _id);
  }
  // console.log(tasks.value)
  type AddTaskPayload = {
    title: string;
    description?: string;
    tags?: string[];
    deadline?: string | null;
    plannedSessions?: number;
  };

  function addTask(_payload: AddTaskPayload): void {
    const title = _payload.title.trim();
    if (!title) return;
    const description = _payload.description?.trim();
    const deadline = _payload.deadline?.trim();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description: description ? description : undefined,
      status: "backlog",
      tags: _payload.tags ?? [],
      deadline: deadline ? deadline : null,
      plannedSessions: _payload.plannedSessions ?? 1,
      completedSessions: 0,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    tasks.value.push(newTask);
  }
  function removeTask(_id: string): void {
    const index = tasks.value.findIndex((t) => {
      return t.id === _id;
    });

    if (index !== -1) {
      // console.log(index)
      tasks.value.splice(index, 1);
    }
  }
  // removeTask('1')

  function moveTask(_id: string, _status: TaskStatus): void {
    const index = tasks.value.findIndex((t) => t.id === _id);
    if (index === -1) return;
    tasks.value[index].status = _status;
    tasks.value[index].completedAt =
      _status === "done" ? new Date().toISOString() : null;
  }
  // moveTask('1', 'in_progress')

  function incrementCompletedSessions(_id: string): void {
    const index = tasks.value.findIndex((t) => t.id === _id);
    if (index !== -1) {
      tasks.value[index].completedSessions += 1;
    }

    // TODO: +1 к completedSessions после успешного помодоро
  }

  return {
    tasks,
    getByStatus,
    addTask,
    removeTask,
    moveTask,
    getTaskById,
    incrementCompletedSessions,
  };
});
