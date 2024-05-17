import "dotenv/config";
import express from "express";
import cors from 'cors';
import { router as taskRouter } from "./routes/task";
import { router as userRouter } from "./routes/user";
import { currentUser } from "./middlewares/current-user";

function main() {
  const app = express();

  // add middlewares
  app.use(cors());
  app.use(express.static("web/dist"));
  app.use(express.json());
  app.use(currentUser());

  // register routes
  app.use("/api/tasks", taskRouter);
  app.use("/api/users", userRouter);

  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
}

main();
