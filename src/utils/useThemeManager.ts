import { applyTheme, createThemeManager, getTheme } from "~/utils/theme";
import { LocalStorageInitials, store } from "~/utils/store";
const theme: string =
    (await store.getItem(LocalStorageInitials.theme.key)) ?? getTheme();

const updateTheme = (theme: string) => {
    store.setItem(LocalStorageInitials.theme.key, theme);
};
const useThemeManager = createThemeManager(theme, updateTheme, applyTheme);
export const themeManager = useThemeManager();
