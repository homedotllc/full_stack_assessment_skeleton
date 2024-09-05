const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const Home = sequelize.define(
  "home",
  {
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sqft: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    beds: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    baths: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    list_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Home;
