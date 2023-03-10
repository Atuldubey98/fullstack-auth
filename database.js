const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.db,
  process.env.username,
  process.env.password,
  {
    dialect: "mariadb",
    host: "127.0.0.1",
    sync: true,
  }
);
const connectDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Connected to database");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
connectDatabase();
module.exports = sequelize;
