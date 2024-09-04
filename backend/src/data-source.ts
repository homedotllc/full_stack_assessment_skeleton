import * as dotenv from "dotenv"
import "reflect-metadata"
import { DataSource } from "typeorm"
dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env
export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: 3306,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
  synchronize: NODE_ENV === "development" ? true : false,
  logging: NODE_ENV === "development" ? true : false,
  driver: require("mysql2")
})
