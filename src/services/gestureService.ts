import { Repository } from "typeorm";
import { Gesture } from "../models/gesture";
import { dataSource } from "../tools/utils";

const gestureRepository: Repository<Gesture> =
  dataSource.getRepository(Gesture);

export default {
  /**
   * Retrieve all gestures from db
   * @returns gestures array
   */
  getAll: async (): Promise<Gesture[]> => {
    return await gestureRepository.find({
      relations: {},
    });
  },

  /**
   * Create a new gesture
   * @param gestureRequest gesture params
   * @returns the created gesture
   */
  create: async (gestureRequest: Gesture): Promise<Gesture> => {
    return await gestureRepository.save(gestureRequest);
  },

  /**
   * Update an existing gesture
   * @param gestureRequest new gesture data
   * @param gestureId existing gesture id
   * @returns updated gesture
   */
  update: async (
    gestureRequest: Gesture,
    gestureId: number
  ): Promise<Gesture | null> => {
    await gestureRepository.update(gestureId, gestureRequest);
    return await gestureRepository.findOneBy({
      id: gestureId,
    });
  },

  /**
   * Delete an existing gesture
   * @param gestureId gesture id to delete
   * @returns
   */
  delete: async (gestureId: number): Promise<any> => {
    return await gestureRepository.delete(gestureId);
  },

  /**
   * Retrieve an existing gesture from db.
   * @param gestureId gesture id to delete
   * @returns
   */
  getById: async (gestureId: number): Promise<any> => {
    return await gestureRepository.findOneBy({ id: gestureId });
  },
};
