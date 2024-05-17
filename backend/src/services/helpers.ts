import bcrypt from "bcrypt";
import { JWT_ALGORITHM, JWT_EXPIRES_IN, JWT_SECRET, SALT_OR_ROUNDS } from "../config";
import jwt from "jsonwebtoken";

export async function createHashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_OR_ROUNDS);
}

export async function comparePassword(
  password: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

export function createAccessToken(payload: any): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: JWT_ALGORITHM,
  });
}

export function getPayloadFromToken<T extends any>(token: string): T | null {
  try {
    return jwt.verify(token, JWT_SECRET, {
      algorithms: [JWT_ALGORITHM],
      ignoreExpiration: false,
    }) as T;
  } catch (e) {
    console.error(e);
    return null;
  }
}
