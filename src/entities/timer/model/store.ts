import { defineStore } from "pinia";
import { ref } from "vue";
import type {
  SessionCompleteListener,
  TimerMode,
  TimerState,
  TimerStatus,
} from "./types";

const DEBUG_TIMER =
  import.meta.env.DEV && import.meta.env.VITE_DEBUG_TIMER === "1";

export const WORK_SECONDS = DEBUG_TIMER ? 5 : 25 * 60;
export const BREAK_SECONDS = DEBUG_TIMER ? 5 : 5 * 60;

function durationForMode(mode: TimerMode): number {
  return mode === "work" ? WORK_SECONDS : BREAK_SECONDS;
}

let tickIntervalId: ReturnType<typeof setInterval> | null = null;
let visibilityHandler: (() => void) | null = null;
const sessionCompleteListeners = new Set<SessionCompleteListener>();

export function subscribeSessionComplete(
  listener: SessionCompleteListener,
): () => void {
  sessionCompleteListeners.add(listener);
  return () => sessionCompleteListeners.delete(listener);
}

function emitSessionComplete(mode: TimerMode): void {
  for (const listener of sessionCompleteListeners) {
    listener(mode);
  }
}

export const useTimerStore = defineStore("timer", () => {
  const state = ref<TimerState>({
    mode: "work",
    status: "idle",
    remainingSeconds: WORK_SECONDS,
    linkedTaskId: null,
    endsAt: null,
  });

  function syncRemainingFromEndsAt(): void {
    if (state.value.endsAt === null) return;
    state.value.remainingSeconds = Math.max(
      0,
      Math.ceil((state.value.endsAt - Date.now()) / 1000),
    );
  }

  function clearTickEngine(): void {
    if (tickIntervalId !== null) {
      clearInterval(tickIntervalId);
      tickIntervalId = null;
    }
    if (visibilityHandler !== null && typeof document !== "undefined") {
      document.removeEventListener("visibilitychange", visibilityHandler);
      visibilityHandler = null;
    }
  }

  function onTick(): void {
    if (state.value.status !== "running") return;

    syncRemainingFromEndsAt();

    if (state.value.remainingSeconds > 0) return;

    const completedMode = state.value.mode;
    emitSessionComplete(completedMode);

    const nextMode: TimerMode = completedMode === "work" ? "break" : "work";
    const duration = durationForMode(nextMode);

    state.value.mode = nextMode;
    state.value.remainingSeconds = duration;
    state.value.endsAt = Date.now() + duration * 1000;
    state.value.status = "running";
  }

  function startTickEngine(): void {
    clearTickEngine();
    syncRemainingFromEndsAt();

    tickIntervalId = setInterval(onTick, 1000);

    if (typeof document !== "undefined") {
      visibilityHandler = () => syncRemainingFromEndsAt();
      document.addEventListener("visibilitychange", visibilityHandler);
    }
  }

  function setStatus(status: TimerStatus): void {
    state.value.status = status;
  }

  function setMode(mode: TimerMode): void {
    state.value.mode = mode;
  }

  function setRemaining(seconds: number): void {
    state.value.remainingSeconds = seconds;
  }

  function setLinkedTaskId(taskId: string | null): void {
    state.value.linkedTaskId = taskId;
  }

  function setEndsAt(timestamp: number | null): void {
    state.value.endsAt = timestamp;
  }

  function start(): void {
    if (state.value.status === "running") return;

    const remaining = state.value.remainingSeconds;
    state.value.endsAt = Date.now() + remaining * 1000;
    state.value.status = "running";
    startTickEngine();
  }

  function pause(): void {
    if (state.value.status !== "running") return;

    syncRemainingFromEndsAt();
    clearTickEngine();
    state.value.endsAt = null;
    state.value.status = "paused";
  }

  function reset(): void {
    clearTickEngine();
    state.value.remainingSeconds = durationForMode(state.value.mode);
    state.value.endsAt = null;
    state.value.status = "idle";
  }

  return {
    state,
    setStatus,
    setMode,
    setRemaining,
    setLinkedTaskId,
    setEndsAt,
    start,
    pause,
    reset,
    syncRemainingFromEndsAt,
  };
});
