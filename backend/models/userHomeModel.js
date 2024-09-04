const { DataTypes } = require("sequelize");
const sequelize = require("../db/connection");

const UserHome = sequelize.define(
  "user_home",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', 
        key: 'id',
      },
      onDelete: 'CASCADE',  
    },
    home_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'home', 
        key: 'id',
      },
      onDelete: 'CASCADE', 
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = UserHome;
