import { useTimerStore } from "@entities/timer";
import { formatTime } from "@shared/lib";
import { computed } from "vue";
import { requestNotificationPermissionIfNeeded } from "./notifications";
import { ensureTimerEngine } from "./timerEngine";

export function useRunTimer() {
  ensureTimerEngine();

  const timerStore = useTimerStore();

  const formattedTime = computed(() =>
    formatTime(timerStore.state.remainingSeconds),
  );

  const modeLabel = computed(() =>
    timerStore.state.mode === "work" ? "Фокус" : "Перерыв",
  );

  const isRunning = computed(() => timerStore.state.status === "running");
  const isPaused = computed(() => timerStore.state.status === "paused");

  function start(): void {
    requestNotificationPermissionIfNeeded();
    timerStore.start();
  }

  function pause(): void {
    timerStore.pause();
  }

  function reset(): void {
    timerStore.reset();
  }

  return {
    state: computed(() => timerStore.state),
    formattedTime,
    modeLabel,
    isRunning,
    isPaused,
    start,
    pause,
    reset,
  };
}
