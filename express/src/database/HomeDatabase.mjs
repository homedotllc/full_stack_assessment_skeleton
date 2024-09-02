import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("home_db", "db_user", "6equj5_db_user", {
  host: "localhost",
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
