import { useTaskStore } from "@entities/task";
import { subscribeSessionComplete, useTimerStore } from "@entities/timer";
import type { TimerMode } from "@entities/timer";
import { notifySessionComplete } from "./notifications";

let engineInitialized = false;

function handleWorkSessionComplete(linkedTaskId: string | null): void {
  if (!linkedTaskId) return;

  const taskStore = useTaskStore();
  const task = taskStore.getTaskById(linkedTaskId);

  if (task?.status === "in_progress") {
    taskStore.incrementCompletedSessions(linkedTaskId);
    return;
  }

  useTimerStore().setLinkedTaskId(null);
}

function onSessionComplete(completedMode: TimerMode): void {
  const timerStore = useTimerStore();

  if (completedMode === "work") {
    handleWorkSessionComplete(timerStore.state.linkedTaskId);
  }

  notifySessionComplete(completedMode);
}

export function ensureTimerEngine(): void {
  if (engineInitialized) return;
  engineInitialized = true;
  subscribeSessionComplete(onSessionComplete);
}
