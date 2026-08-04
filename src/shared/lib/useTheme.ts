import { useDark, useToggle } from "@vueuse/core";

export function useTheme() {
  const isDark = useDark({
    storageKey: "devpulse.theme",
    valueDark: "dark",
    valueLight: "light",
  });

  const toggleTheme = useToggle(isDark);

  return { isDark, toggleTheme };
}
