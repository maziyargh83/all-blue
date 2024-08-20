import { idioma } from "~/utils/ui";

export default function New() {
    return (
        <main class="w-full p-4 space-y-2">
            <h1>{idioma().t('new.welcome')}</h1>
        </main>
    );
}
