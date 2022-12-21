import { DataSource } from "typeorm";
import { Challenge } from "../models/challenge";
import { User } from "../models/user";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "password",
  database: "ecochallenge",
  synchronize: true,
  entities: [Challenge, User],
});