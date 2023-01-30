const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./User");
const Address = sequelize.define("address", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  block: {
    type: DataTypes.STRING,
  },
  area: {
    type: DataTypes.STRING,
  },
  pincode: {
    type: DataTypes.INTEGER,
  },
  landmark: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
});
User.belongsTo(Address);
User.hasMany(Address);
Address.sync();
module.exports = Address;
