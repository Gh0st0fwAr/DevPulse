import { generateId } from "@shared/lib";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed } from "vue";
import type { Task, TaskStatus } from "./types";

type AddTaskPayload = {
  title: string;
  description?: string;
  tags?: string[];
  deadline?: string | null;
  plannedSessions?: number;
};

export const useTaskStore = defineStore("tasks", () => {
  const tasks = useLocalStorage<Task[]>("devpulse.tasks", []);

  const tasksByStatus = computed(() => ({
    backlog: tasks.value.filter((task) => task.status === "backlog"),
    in_progress: tasks.value.filter((task) => task.status === "in_progress"),
    done: tasks.value.filter((task) => task.status === "done"),
  }));

  function getByStatus(status: TaskStatus): Task[] {
    return tasksByStatus.value[status];
  }

  function getTaskById(id: string): Task | undefined {
    return tasks.value.find((task) => task.id === id);
  }

  function addTask(payload: AddTaskPayload): void {
    const title = payload.title.trim();
    if (!title) return;

    const description = payload.description?.trim();
    const deadline = payload.deadline?.trim();

    const newTask: Task = {
      id: generateId(),
      title,
      description: description ? description : undefined,
      status: "backlog",
      tags: payload.tags ?? [],
      deadline: deadline ? deadline : null,
      plannedSessions: payload.plannedSessions ?? 1,
      completedSessions: 0,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };

    tasks.value.push(newTask);
  }

  function removeTask(id: string): void {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index === -1) return;
    tasks.value.splice(index, 1);
  }

  function moveTask(id: string, status: TaskStatus): void {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index === -1) return;

    const current = tasks.value[index];
    tasks.value[index] = {
      ...current,
      status,
      completedAt: status === "done" ? new Date().toISOString() : null,
    };
  }

  function incrementCompletedSessions(id: string): void {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index === -1) return;

    const current = tasks.value[index];
    tasks.value[index] = {
      ...current,
      completedSessions: current.completedSessions + 1,
    };
  }

  return {
    tasks,
    tasksByStatus,
    getByStatus,
    addTask,
    removeTask,
    moveTask,
    getTaskById,
    incrementCompletedSessions,
  };
});
