import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entities/User"
import { Home } from "./entities/Home"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "db_user",
    password: "6equj5_db_user",
    database: "home_db",
    synchronize: true,
    logging: false,
    entities: [User , Home],
    migrations: [],
    subscribers: [],
})
