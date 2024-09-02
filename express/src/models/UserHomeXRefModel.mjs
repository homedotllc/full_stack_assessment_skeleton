import { Home } from "./HomeModel.mjs";
import { User } from "./UserModel.mjs";
import { DataTypes } from "sequelize";
import { sequelize } from "../database/HomeDatabase.mjs";

export const UserHomeXRef = sequelize.define(
  "UserHomeXRef",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      references: {
        model: User,
        key: "email",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    home_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      references: {
        model: Home,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "user_home_x_ref",
    timestamps: true,
  }
);
