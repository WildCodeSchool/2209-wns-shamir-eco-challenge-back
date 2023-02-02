import { Repository } from "typeorm";
import { Challenge } from "../models/challenge";
import { Gesture } from "../models/gesture";
import { dataSource } from "../tools/utils";

const challengeRepository: Repository<Challenge> = dataSource.getRepository(Challenge);
const gestureRepository: Repository<Gesture> = dataSource.getRepository(Gesture);

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
  create: async (challengeRequest: { name: string, gestures: Gesture[]}): Promise<Challenge> => {
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

  /**
   * Add a gesture to a challenge.
   * @param gestureId gesture id to add
   * @param challengeId challenge id to add gesture to
   * @returns updated challenge
   * @throws Error if challenge or gesture not found
   * @throws Error if gesture already in challenge
   */
  addGesture: async (gestureId: number, challengeId: number) => {
        // Récupérer le challenge
        const challenge = await challengeRepository.findOneBy({
            id: (challengeId)
        });
        // Récupérer le gesture
        const gesture = await gestureRepository.findOneBy({
            id: (gestureId)
        });
        // Vérifier que le challenge et le gesture existent
        if ((challenge == null) || (gesture == null)) {
            throw new Error('Challenge or gesture not found');
        }
        // Vérifier que le gesture n'est pas déjà dans le challenge
        if (challenge.gestures.find((challengeGesture) => challengeGesture.id === gesture.id) != null) {
            return challenge;
        }
        // Ajouter le gesture au challenge
        challenge.gestures.push(gesture);
        return await challengeRepository.save(challenge);
    }
};