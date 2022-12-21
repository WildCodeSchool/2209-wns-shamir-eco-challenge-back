import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { CreateChallengeInput } from "../inputs/createChallengeInput";
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
}