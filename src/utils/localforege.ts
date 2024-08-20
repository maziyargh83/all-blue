import localforage from "localforage";
export type storageType = Record<
    string,
    {
        key: string;
        value: unknown;
        replace?: boolean;
    }
>;
export const createLocalforge = () => {
    const instance = localforage.createInstance({
        name: "@AllBlue",
        driver: localforage.LOCALSTORAGE,
    });
    return () => {
        const installAppStorage = async <T extends storageType>(data: T) => {
            for await (const [, { key, value, replace }] of Object.entries(data)) {
                const isExist: boolean | null = await instance.getItem(key);
                if (isExist !== null && !replace) return;
                await instance.setItem(key, value);
            }
        };
        return {
            getItem: instance.getItem,
            setItem: instance.setItem,
            removeItem: instance.removeItem,
            clear: instance.clear,
            installAppStorage,
        };
    };
};
