
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateGestureInput } from "../inputs/createGestureInput";
import { Gesture } from "../models/gesture";
import gestureService from "../services/gestureService";

@Resolver(Gesture)
export class GestureResolver {
  @Query(() => [Gesture])
  async getAllGestures(): Promise<Gesture[]> {
    return await gestureService.getAll();
  }

  @Mutation(() => Gesture)
  async createGesture(
    @Arg("gesture") gesture: CreateGestureInput
  ): Promise<Gesture> {
    return await gestureService.create(gesture);
  }
}