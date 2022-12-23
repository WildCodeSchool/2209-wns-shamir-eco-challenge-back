
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateGestureInput } from "../inputs/createGestureInput";
import { UpdateGestureInput } from "../inputs/updateGestureInput";
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

  @Mutation(() => Gesture)
  async updateGesture(
    @Arg("id") id: number,
    @Arg("gesture") gesture: UpdateGestureInput
      ): Promise<Gesture | null> {
    return await gestureService.update(gesture, id);
  }

  @Mutation(() => Gesture)
  async deleteGesture(
    @Arg("id") id: number
      ): Promise<String> {
    return await gestureService.delete(id);
  }
}