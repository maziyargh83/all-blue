"use server";
import { redirect } from "@solidjs/router";
import { useSession } from "vinxi/http";
import { eq, } from "drizzle-orm";
import { db } from "./db";
import { Users } from "../../drizzle/schema";
import { hash, compare } from 'bcrypt'


export async function login(userData: typeof Users.$inferInsert) {
  const user = db.select().from(Users).where(eq(Users.username, userData.username)).get();
  if (!user) throw new Error("Invalid login");
  const isSame = await compare(userData.password, user.password)
  if (!isSame) throw new Error("Invalid login");
  return user;
}

export async function register(userData: typeof Users.$inferInsert) {
  const existingUser = db.select().from(Users).where(eq(Users.username, userData.username)).get();
  if (existingUser) throw new Error("User already exists");
  const password = await hash(userData.password, 10)
  return db.insert(Users).values({ ...userData, password }).returning().get();
}
export function createAdmin(userData: typeof Users.$inferInsert) {
  return register({ ...userData, role: "admin" })
}

function getSession() {
  return useSession({
    password: process.env.SESSION_SECRET ?? "areallylongsecretthatyoushouldreplace",

  });
}


export async function logout() {
  const session = await getSession();
  await session.update(d => (d.userId = undefined));
  throw redirect("/login");
}

export async function getUser() {
  const session = await getSession();
  const userId = session.data.userId;
  if (userId === undefined) throw redirect("/login");

  try {
    const user = db.select().from(Users).where(eq(Users.id, userId)).get();
    if (!user) throw redirect("/login");
    return { id: user.id, username: user.username };
  } catch {
    throw logout();
  }
}
