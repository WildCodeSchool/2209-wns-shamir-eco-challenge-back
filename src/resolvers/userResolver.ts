import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UpdateUserInput } from "../inputs/updateUserInput";
import { User } from "../models/user";
import authService from "../services/authService";
import userService from "../services/userService";

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async getAllUsers(): Promise<User[]> {
    return await userService.getAll();
  }

  @Mutation(() => User)
  async createUser(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User> {
    const userFromDB = await userService.create(email, password);
    console.log(userFromDB);
    return userFromDB;
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("id") id: number,
    @Arg("user") user: UpdateUserInput
  ): Promise<User | null> {
    return await userService.update(user, id);
  }

  @Mutation(() => User)
  async deleteUser(@Arg("id") id: number): Promise<String> {
    return await userService.delete(id);
  }

  @Mutation(() => String)
  async getToken(
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<String> {
    try {
      // Récupérer l'utilisateur dans la bdd suivant l'email
      const userFromDB = await userService.getByEmail(email);
      // Vérifier que ce sont les même mots de passe
      if (
        await authService.verifyPassword(password, userFromDB.hashedPassword)
      ) {
        // Créer un nouveau token => signer un token
        const token = authService.signJwt({
          email: userFromDB.email,
          role: userFromDB.role,
        });

        // Renvoyer le token
        return token;
      } else {
        throw new Error();
      }
    } catch (e) {
      throw new Error("Invalid Auth");
    }
  }
}
