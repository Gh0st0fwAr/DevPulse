export type TimerMode = "work" | "break";

export type TimerStatus = "idle" | "running" | "paused";

export interface TimerState {
  mode: TimerMode;
  status: TimerStatus;
  remainingSeconds: number;
  linkedTaskId: string | null;
  endsAt: number | null;
}

export type SessionCompleteListener = (completedMode: TimerMode) => void;
