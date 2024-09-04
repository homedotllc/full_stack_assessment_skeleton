const sequelize = require("../db/connection");
const User = require("./userModel");
const Home = require("./homeModel");
const UserHome = require("./userHomeModel");

User.belongsToMany(Home, { through: UserHome, foreignKey: "user_id" });
Home.belongsToMany(User, { through: UserHome, foreignKey: "home_id" });

module.exports = {
  sequelize,
  User,
  Home,
  UserHome,
};
