import express, { Request, Response } from "express";
import { User } from "../models/user";
import service from "../services/userService";

const router = express.Router();

// GET /api/users
router.get("/", async (request: Request, response: Response) => {
  const users: User[] = await service.getAll();
  response.send(users);
});

export default router;