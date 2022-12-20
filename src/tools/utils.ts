import { DataSource } from "typeorm";
import { User } from "../entities/User";

export const dataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "admin",
  password: "password",
  database: "ecochallenge",
  synchronize: true,
  entities: [User],
});