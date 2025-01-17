import { User } from "../drizzle/schema";
import { db } from "../drizzle/db";
import { eq } from "drizzle-orm/sql";
import {
  comparePassword,
  createAccessToken,
  createHashPassword,
} from "./helpers";

type UserType = typeof User.$inferSelect;

export async function createUser(data: {
  email: string;
  password: string;
  name: string;
}): Promise<UserType | undefined> {
  try {
    const hashPassword = await createHashPassword(data.password);
    const user = await db
      .insert(User)
      .values({
        email: data.email,
        name: data.name,
        hashPassword,
      })
      .returning()
      .execute();

    return user[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function getUserById(
  id: string
): Promise<Omit<UserType, "hashPassword"> | undefined> {
  try {
    const user = await db.query.User.findFirst({
      where: eq(User.id, id),
    }).execute();
    const returnedUser = user
      ? {
          id: user.id,
          email: user.email,
          name: user.name,
          createdAt: user.createdAt,
        }
      : undefined;
    return returnedUser;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function updateUser(
  id: string,
  data: { password?: string; name?: string }
): Promise<UserType | undefined> {
  const newDataToUpdate: Partial<UserType> = {};

  if (data.password) {
    newDataToUpdate.hashPassword = await createHashPassword(data.password);
  }
  if (data.name) {
    newDataToUpdate.name = data.name;
  }

  try {
    const user = await db
      .update(User)
      .set(newDataToUpdate)
      .where(eq(User.id, id))
      .returning()
      .execute();

    return user[0];
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export async function loginUser(
  email: string,
  password: string
): Promise<{ access_token: string; user: Omit<UserType, "hashPassword"> } | undefined> {
  try {
    const user = await db.query.User.findFirst({
      where: eq(User.email, email),
    }).execute();

    if (!user) {
      return undefined;
    }

    const verified = await comparePassword(password, user.hashPassword);
    if (!verified) {
      return undefined;
    }

    const token = createAccessToken({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return {
      access_token: token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        createdAt: user.createdAt,
      },
    };
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
