"use server";

import { configDb } from "../../drizzle/config";
import { redirect } from "@solidjs/router";

export const checkComplete = () => !configDb.data.isComplete && redirect('/new')
