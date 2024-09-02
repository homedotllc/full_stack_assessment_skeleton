import { DataTypes } from "sequelize";
import { sequelize } from "../database/HomeDatabase.mjs";

export const User = sequelize.define(
  "user",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    timestamps: true,
  }
);
