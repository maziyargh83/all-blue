import { createSignal } from "solid-js";
import Idioma from "~/utils/idioma";
import { base } from "~/utils/lang/base";

type Languages = 'fa' | 'en';

const loadLanguage = async (lang: Languages): Promise<typeof base> => {
    return import(`./lang/${lang}.ts`).then(item => item.default);
};

const createIdioma = () => {
    const [currentLang, setLang] = createSignal<Languages>('en');
    const [idiomaBase, setBase] = createSignal(new Idioma(base as typeof base));

    const getIdioma = async (lang: Languages) => {
        const module = await loadLanguage(lang);
        return new Idioma(module);
    };

    const changeLanguage = async (lang: Languages) => {
        setLang(lang);
        const newIdioma = await getIdioma(lang);
        setBase(newIdioma);
    };

    return {
        idiomaBase,
        currentLang,
        change: changeLanguage
    }
};
const { idiomaBase, change, currentLang } = createIdioma();
export const idioma = idiomaBase;
export { change, currentLang }
