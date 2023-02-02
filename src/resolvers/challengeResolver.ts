import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateChallengeInput } from "../inputs/createChallengeInput";
import { UpdateChallengeInput } from "../inputs/updateChallengeInput";
import { Challenge } from "../models/challenge";
import challengeService from "../services/challengeService";

@Resolver(Challenge)
export class ChallengeResolver {
  @Query(() => [Challenge])
  async getAllChallenges(): Promise<Challenge[]> {
    return await challengeService.getAll();
  }

  @Mutation(() => Challenge)
  async createChallenge(
    @Arg("challenge") challenge: CreateChallengeInput
  ): Promise<Challenge> {
    return await challengeService.create(challenge);
  }

  @Mutation(() => Challenge)
  async updateChallenge(
    @Arg("id") id: number,
    @Arg("challenge") challenge: UpdateChallengeInput
      ): Promise<Challenge | null> {
    return await challengeService.update(challenge, id);
  }

  @Mutation(() => Challenge)
  async deleteChallenge(
    @Arg("id") id: number
      ): Promise<String> {
    return await challengeService.delete(id);
  }

  @Mutation(() => Challenge)
  async addGesture(
    @Arg("challengeId") challengeId: number,
    @Arg("gestureId") gestureId: number
  ): Promise<Challenge> {
    return await challengeService.addGesture(challengeId, gestureId);
  }
}