import { Repository } from "typeorm";
import { Challenge } from "../models/challenge";
import { dataSource } from "../tools/utils";

const challengeRepository: Repository<Challenge> = dataSource.getRepository(Challenge);

export default {
  /**
   * Retrieve all challenges from db.
   * @returns challenges array
   */
  getAll: async (): Promise<Challenge[]> => {
    return await challengeRepository.find({
      relations: {
      
      },
    });
  },

  /**
   * Create a new challenge
   * @param challengeRequest challenge params
   * @returns the created challenge
   */
  create: async (challengeRequest: Challenge): Promise<Challenge> => {
    return await challengeRepository.save(challengeRequest);
  },

  /**
   * Update an existing challenge.
   * @param challengeRequest new challenge data
   * @param challengeId existing challenge id
   * @returns updated challenge
   */
  update: async (
    challengeRequest: Challenge,
    challengeId: number
  ): Promise<Challenge | null> => {
    await challengeRepository.update(challengeId, challengeRequest);
    return await challengeRepository.findOneBy({
      id: challengeId,
    });
  },

  /**
   * Delete an existing challenge.
   * @param challengeId challenge id to delete
   * @returns
   */
  delete: async (challengeId: number): Promise<any> => {
    return await challengeRepository.delete(challengeId);
  },
};