import * as dotenv from "dotenv"
import "reflect-metadata"
import { DataSource } from "typeorm"
import { Home } from "./entity/home.entity"
import { User } from "./entity/user.entity"
import { UserHome } from "./entity/userHome.entity"
dotenv.config()

const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME, NODE_ENV } = process.env
export const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_HOST,
  port: DB_PORT ? parseInt(DB_PORT) : 3306,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  entities: [User, Home, UserHome],
  // entities: [join(__dirname, "**", "*.entity.{ts,js}")],
  // entities: [__dirname + "/**/*.entity{.ts,.js}"],
  migrations: [],
  subscribers: [],
  // synchronize: NODE_ENV === "development" ? true : false,
  synchronize: false,
  logging: NODE_ENV === "development" ? true : false,
  driver: require("mysql2")
})
