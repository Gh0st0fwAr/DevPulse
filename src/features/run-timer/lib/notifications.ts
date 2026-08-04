import type { TimerMode } from "@entities/timer";

export function playEndSound(): void {
  try {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.frequency.value = 880;
    gain.gain.value = 0.08;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  } catch {}
}

export function notifySessionComplete(mode: TimerMode): void {
  playEndSound();

  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "granted") return;

  const title = mode === "work" ? "Фокус-сессия завершена" : "Перерыв завершён";
  const body =
    mode === "work"
      ? "Пора на короткий перерыв."
      : "Можно снова переключиться на работу.";

  new Notification(title, { body });
}

export function requestNotificationPermissionIfNeeded(): void {
  if (typeof window === "undefined" || !("Notification" in window)) return;
  if (Notification.permission !== "default") return;
  void Notification.requestPermission();
}
