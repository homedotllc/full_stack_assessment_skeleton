// config/database.js
const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the MySQL container
const sequelize = new Sequelize('home_db', 'db_user', '6equj5_db_user', {
  host: '127.0.0.1',
  port: 3306,   
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
