import express, { Request, Response } from "express";
import { User } from "../models/user";
import service from "../services/userService";

const router = express.Router();

// GET /api/users
router.get("/", async (request: Request, response: Response) => {
  const users: User[] = await service.getAll();
  response.send(users);
});

// PUT /users/4
// BODY {}
router.put("/:id", async (request: Request, response: Response) => {
  const userId: number = parseInt(request.params.id);
  const userRequest: User = request.body;
  const userUpdated: User | null = await service.update(userRequest, userId);
  response.send(userUpdated);
});

// DELETE /users/6
router.delete("/:id", async (request: Request, response: Response) => {
  const userId: number = parseInt(request.params.id);
  await service.delete(userId);
  response.sendStatus(204);
});

export default router;
