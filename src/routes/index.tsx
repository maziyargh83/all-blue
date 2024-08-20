import { type RouteDefinition } from "@solidjs/router";
import { checkCreate } from "~/api";

export const route = {
  preload: () => checkCreate()
} satisfies RouteDefinition;

export default function Home() {
  return (
    <main class="w-full p-4 space-y-2">

    </main>
  );
}
