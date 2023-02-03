import { Repository } from "typeorm";
import { Challenge } from "../models/challenge";
import { Gesture } from "../models/gesture";
import { User } from "../models/user";
import { dataSource } from "../tools/utils";

const challengeRepository: Repository<Challenge> =
  dataSource.getRepository(Challenge);
const gestureRepository: Repository<Gesture> =
  dataSource.getRepository(Gesture);
const playerRepository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Retrieve all challenges from db.
   * @returns challenges array
   */
  getAll: async (): Promise<Challenge[]> => {
    return await challengeRepository.find({
      relations: {},
    });
  },

  /**
   * Create a new challenge
   * @param challengeRequest challenge params
   * @returns the created challenge
   */
  create: async (challengeRequest: {
    name: string;
    image: string;
    startDate: string;
    endDate: string;
    // TODO: Remove challengeStatus from create and directly manage it with dates
    challengeStatus: string;
    gestures: Gesture[];
    players: User[];
  }): Promise<Challenge> => {
    // challengeRepository.gestures = [category1, category2];
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
   * @param challengeId challenge id to return
   * @returns challenge
   */
  delete: async (challengeId: number): Promise<any> => {
    return await challengeRepository.delete(challengeId);
  },

  /**
   * Retrieve an existing challenge from db.
   * @param challengeId challenge id to delete
   * @returns
   */
  getById: async (challengeId: number): Promise<any> => {
    return await challengeRepository.findOneBy({ id: challengeId });
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
      id: challengeId,
    });
    // Récupérer le gesture
    const gesture = await gestureRepository.findOneBy({
      id: gestureId,
    });
    // Vérifier que le challenge et le gesture existent
    if (challenge == null || gesture == null) {
      throw new Error("Challenge or gesture not found");
    }
    // Vérifier que le gesture n'est pas déjà dans le challenge
    if (
      challenge.gestures.find(
        (challengeGesture) => challengeGesture.id === gesture.id
      ) != null
    ) {
      return challenge;
    }
    // Ajouter le gesture au challenge
    challenge.gestures.push(gesture);
    return await challengeRepository.save(challenge);
  },

  /**
   * Add a player to a challenge.
   * @param playerId player id to add
   * @param challengeId challenge id to add player to
   * @returns updated challenge
   * @throws Error if challenge or player not found
   * @throws Error if player already in challenge
   */
  addPlayer: async (playerId: number, challengeId: number) => {
    // Récupérer le challenge
    const challenge = await challengeRepository.findOneBy({
      id: challengeId,
    });
    console.log(challenge);
    // Récupérer le player
    console.log(playerId);
    const player = await playerRepository.findOneBy({
      id: playerId,
    });
    console.log(player);
    // Vérifier que le challenge et le player existent
    if (challenge == null || player == null) {
      throw new Error("Challenge or player not found");
    }
    // Vérifier que le player n'est pas déjà dans le challenge
    if (
      challenge.players.find(
        (challengePlayer) => challengePlayer.id === player.id
      ) != null
    ) {
      return challenge;
    }
    // Ajouter le gesture au challenge
    challenge.players.push(player);
    return await challengeRepository.save(challenge);
  },
};
