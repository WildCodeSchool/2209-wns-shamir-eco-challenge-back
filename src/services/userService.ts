import { Repository } from "typeorm";
import { User } from "../models/user";
import { dataSource } from "../tools/utils";
import * as argon2 from "argon2";

const repository: Repository<User> = dataSource.getRepository(User);
const userRepository: Repository<User> = dataSource.getRepository(User);

export default {
  /**
   * Retrieve all challenges from db.
   * @returns challenges array
   */
  getAll: async (): Promise<User[]> => {
    return await repository.find();
  },

  /**
   * Return the user relative to the given email
   * @param email user email
   * @returns
   */
  getByEmail: async (email: string) => {
    return await repository.findOneByOrFail({ email });
  },

  /**
   * Create a new user in the database.
   * @param email user email
   * @param password user password
   * @returns
   */
  create: async (email: string, password: string): Promise<User> => {
    const newUser = new User();
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    newUser.email = email;
    newUser.hashedPassword = await argon2.hash(password);
    // TODO: Afficher sur le front en rajoutant #id (non ajoutable via back à la création)
    newUser.name = "User";
    newUser.role = "USER";
    newUser.image =
      "https://t4.ftcdn.net/jpg/05/09/59/75/360_F_509597532_RKUuYsERhODmkxkZd82pSHnFtDAtgbzJ.jpg";
    newUser.color = `#${randomColor}`;
    return await repository.save(newUser);
  },

  /**
   * Update an existing user
   * @param userRequest new user data
   * @param userId existing user id
   * @returns updated user
   */
  update: async (userRequest: User, userId: number): Promise<User | null> => {
    await userRepository.update(userId, userRequest);
    return await userRepository.findOneBy({
      id: userId,
    });
  },

  /**
   * Delete an existing user
   * @param userId user id to delete
   * @returns
   */
  delete: async (userId: number): Promise<any> => {
    return await userRepository.delete(userId);
  },
};
