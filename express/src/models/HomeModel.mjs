import { DataTypes } from "sequelize";
import { sequelize } from "../database/HomeDatabase.mjs";

export const Home = sequelize.define(
  "home",
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
    },
    zip: {
      type: DataTypes.STRING,
    },
    sqft: {
      type: DataTypes.FLOAT,
    },
    beds: {
      type: DataTypes.INTEGER,
    },
    baths: {
      type: DataTypes.INTEGER,
    },
    list_price: {
      type: DataTypes.FLOAT,
    },
  },
  {
    tableName: "home",
    timestamps: true,
  }
);
