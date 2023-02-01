const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const Rating = require("./Rating");
const Product = sequelize.define("products", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.DOUBLE,
    validate: {
      isNumeric: true,
      min: 1,
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      isInt: true,
      min: 0,
    },
  },
});
Rating.hasOne(Product);
Product.belongsTo(Rating);
module.exports = Product;
