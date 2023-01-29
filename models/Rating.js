const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rating = sequelize.define("ratings", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rate: {
    type: DataTypes.DOUBLE,
  },
  count: {
    type: DataTypes.INTEGER,
  },
});
Rating.sync();
module.exports = Rating;
