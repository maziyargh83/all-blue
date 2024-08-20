export const createThemeManager = (
  theme?: string,
  updateTheme?: (theme?: string) => void,
  applyTheme?: (theme?: string) => void,
) => {
  const selectedTheme = theme;
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  let currentTheme = selectedTheme
    ? selectedTheme
    : isDarkMode
      ? "dark"
      : "light";

  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      const t = event.matches ? "dark" : "light";
      currentTheme = t;
      updateTheme?.(t);
      applyTheme?.(t);
    });
  applyTheme?.(currentTheme);

  return () => {
    const changeCurrentColor = (newTheme: string) => {
      currentTheme = newTheme;
      updateTheme?.(newTheme);
      applyTheme?.(newTheme);
    };
    return {
      getCurrentTheme: () => currentTheme,
      changeCurrentColor,
      switchTheme: () => {
        const color = currentTheme === "dark" ? "light" : "dark";
        changeCurrentColor(color);
      },
    };
  };
};

export const getTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return isDarkMode ? "dark" : "light";
};
