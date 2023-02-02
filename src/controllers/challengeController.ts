import express, { Request, Response } from "express";
import { Challenge } from "../models/challenge"
import service from "../services/challengeService";

const router = express.Router();

// GET /api/challenges
router.get("/", async (request: Request, response: Response) => {
  const challenges: Challenge[] = await service.getAll();
  response.send(challenges);
});

// POST /challenge
// BODY {}
router.post("/", async (request: Request, response: Response) => {
  try {
    const challengeRequest: Challenge = request.body;
    const challengeCreated: Challenge = await service.create(challengeRequest);
    response.send(challengeCreated);
  } catch (e) {
    response.send("ERROR");
  }
});

// PUT /challenges/4
// BODY {}
router.put("/:id", async (request: Request, response: Response) => {
  const challengeId: number = parseInt(request.params.id);
  const challengeRequest: Challenge = request.body;
  const challengeUpdated: Challenge| null = await service.update(
    challengeRequest,
    challengeId
  );
  response.send(challengeUpdated);
});

// DELETE /challenges/6
router.delete("/:id", async (request: Request, response: Response) => {
  const challengeId: number = parseInt(request.params.id);
  await service.delete(challengeId);
  response.sendStatus(204);
});

// POST /challenges/4/gestures/2
router.post("/:challengeId/gestures/:gestureId", async (request: Request, response: Response) => {
  try {
    const challengeId: number = parseInt(request.params.id);
    const gestureId: number = parseInt(request.params.id);
    const challenge = await service.addGesture(challengeId, gestureId);
    response.send(challenge);
  } catch (e) { 
      response.status(400).send("ERROR"); 
  }
});
export default router;