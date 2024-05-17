import { NextFunction, Request, Response } from "express";
import { getPayloadFromToken } from "../services/helpers";
import { getUserById } from "../services/user";

export function currentUser(opts?: { required: boolean }) {
  const required = opts?.required ?? false;
  return async (request: Request, _: Response, next: NextFunction) => {
    const authorizationHeader = request.headers.authorization;
    if (authorizationHeader) {
      const token = authorizationHeader.split(" ")[1];
      if (token) {
        const payload = getPayloadFromToken<{
          id: string;
        }>(token);
        if (payload) {
          const user = await getUserById(payload.id);
          request.user = user;
        }
      }
    }

    if (request.user === undefined && required) {
      return next("Unauthorized");
    }
    next();
  };
}
