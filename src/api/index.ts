import { action, cache, } from "@solidjs/router";
import { getUser as gU, logout as l, } from "./auth";
import { checkComplete } from "~/api/config";

export const getUser = cache(gU, "user");
export const checkCreate = cache(checkComplete, "complete");
export const logout = action(l, "logout");