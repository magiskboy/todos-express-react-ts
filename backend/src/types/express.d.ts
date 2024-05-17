import { User } from "./models/user";

declare namespace Express {
  export interface Request {
    user?: typeof User.$inferSelect;
  }
}
