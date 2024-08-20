// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import "./utils/useThemeManager";

mount(() => <StartClient />, document.getElementById("app")!);
