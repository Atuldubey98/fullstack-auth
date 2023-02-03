const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const jwt = require("jsonwebtoken");
const User = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 3,
      },
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "USER",
    },
  },
  {
    getterMethods: {
      getJWTToken() {
        return jwt.sign(
          { email: this.email, user: this.name, role: this.role },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.JWT_EXPIRE,
          }
        );
      },
    },
  }
);
User.sync();
module.exports = User;
