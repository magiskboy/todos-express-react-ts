import { Router } from "express";
import { currentUser } from "../middlewares/current-user";
import { body } from "express-validator";
import { createUser, loginUser, updateUser } from "../services/user";

export const router = Router();

// Get current user
router.get("/me", currentUser({ required: true }), (request, response) => {
  response.status(200).json({
    data: request.user,
  });
});

// Register a new user
router.post(
  "",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  body("name").notEmpty().isString(),
  async (request, response) => {
    const data = request.body;
    const newUser = await createUser(data);
    if (!newUser) {
      return response.status(400).json({
        error: "Failed to create user",
      });
    }
    return response.status(201).json({
      data: newUser,
    });
  }
);

// Login a user
router.post(
  "/login",
  body("email").notEmpty().isEmail(),
  body("password").notEmpty().isString(),
  async (request, response) => {
    const { email, password } = request.body;
    const data = await loginUser(email, password);
    if (data) {
      return response.status(200).json({
        data: {
          accessToken: data.access_token,
          user: data.user,
        },
      });
    }

    return response.status(400).json({
      error: "Email or password is incorrect",
    });
  }
);

// Update current user
router.put(
  "/me",
  body().notEmpty(),
  currentUser({ required: true }),
  async (request, response) => {
    const data = request.body;
    const updatedUser = await updateUser(request.user.id, data);
    if (!updatedUser) {
      return response.status(400).json({
        error: "Failed to update user",
      });
    }
    return response.status(200).json({
      data: updatedUser,
    });
  }
);
