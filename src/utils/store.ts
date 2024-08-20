import { getTheme } from "~/utils/theme";
import { createLocalforge, type storageType } from "~/utils/localforege";
const create = createLocalforge();
const { installAppStorage, ...storeAction } = create();

export const store = storeAction;
export const LocalStorageInitials = {
    token: {
        key: "token",
        value: undefined,
    },
    theme: {
        key: "theme",
        value: getTheme(),
    },
} satisfies storageType;

await installAppStorage(LocalStorageInitials);
