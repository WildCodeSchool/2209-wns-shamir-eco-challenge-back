import express, { Request, Response } from "express";
import { Gesture } from "../models/gesture";
import service from "../services/gestureService";

const router = express.Router();

// GET /api/gestures
router.get("/", async (request: Request, response: Response) => {
  const gestures: Gesture[] = await service.getAll();
  response.send(gestures);
});

// POST /gesture
// BODY {}
router.post("/", async (request: Request, response: Response) => {
  try {
    const gestureRequest: Gesture = request.body;
    const gestureCreated: Gesture = await service.create(gestureRequest);
    response.send(gestureCreated);
  } catch (e) {
    response.send("ERROR");
  }
});

// PUT /gestures/4
// BODY {}
router.put("/:id", async (request: Request, response: Response) => {
  const gestureId: number = parseInt(request.params.id);
  const gestureRequest: Gesture = request.body;
  const gestureUpdated: Gesture| null = await service.update(
    gestureRequest,
    gestureId
  );
  response.send(gestureUpdated);
});

// DELETE /gestures/6
router.delete("/:id", async (request: Request, response: Response) => {
  const gestureId: number = parseInt(request.params.id);
  await service.delete(gestureId);
  response.sendStatus(204);
});

export default router;