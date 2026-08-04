import { useTaskStore } from "@entities/task";
import { useTimerStore } from "@entities/timer";
import { watch } from "vue";

export function useTimerTaskSync(): void {
  const taskStore = useTaskStore();
  const timerStore = useTimerStore();

  watch(
    () => taskStore.tasks,
    () => {
      const linkedId = timerStore.state.linkedTaskId;
      if (!linkedId) return;

      const task = taskStore.getTaskById(linkedId);
      if (!task || task.status !== "in_progress") {
        timerStore.setLinkedTaskId(null);
      }
    },
    { deep: true },
  );
}
