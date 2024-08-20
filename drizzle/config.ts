import { JSONFilePreset } from "lowdb/node";

export const configDb = await JSONFilePreset('db.json', {
    isComplete: false,
    title: undefined,
    description: undefined,
    email: undefined
}) 