type TranslationKeys<T> = T extends TranslationObject
    ? {
        [K in keyof T & (string | number)]: T[K] extends TranslationObject
        ? `${K}` | `${K}.${TranslationKeys<T[K]>}`
        : T[K] extends string
        ? `${K}`
        : never;
    }[keyof T & (string | number)]
    : never;
type ExtractArgs<T extends string> =
    T extends `${infer _}{{${infer P}}}${infer Rest}`
    ? { [K in P | keyof ExtractArgs<Rest>]: string }
    : object;

type TranslationObject = {
    [key: string]: string | TranslationObject;
};

type GetTranslation<
    T,
    P extends string,
> = P extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
    ? GetTranslation<T[Key], Rest>
    : never
    : P extends keyof T
    ? T[P] extends string
    ? T[P]
    : never
    : never;
class Idioma<T extends TranslationObject> {
    private translations: T;

    constructor(defaultTranslations: T) {
        this.translations = defaultTranslations;
    }

    t<
        K extends TranslationKeys<T>,
        A extends ExtractArgs<Extract<GetTranslation<T, K>, string>>,
    >(key: K, args?: A): string {
        const translation = this.getTranslation(key);
        if (typeof translation === "string") {
            return args ? Idioma.interpolate(translation, args) : translation;
        }
        return key; // Return the key if the translation is not found or not a string
    }

    private getTranslation<K extends TranslationKeys<T>>(key: K): string {
        const keys = key.split(".");
        let result: T | string = this.translations;

        for (const k of keys) {
            result = result[k];
            if (result === undefined) {
                return key as string; // Return the key if the translation is not found
            }
        }

        return result as string;
    }

    static interpolate<E extends string>(text: E, args: ExtractArgs<E>): string {
        return text.replace(/\{\{(\w+)\}\}/g, (_, variable) => {
            return args[variable] !== undefined ? args[variable] : `{{${variable}}}`;
        });
    }
}

export default Idioma;
