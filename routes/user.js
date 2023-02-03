const express = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const Address = require("../models/Address");

const { auth } = require("../middlewares/auth");
const userRouter = express.Router();

userRouter.get("/current", auth, (req, res, next) => {
  return res.status(200).json({ status: true, user: req.user });
});
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByPk(email);
    if (!user) {
      return res
        .status(404)
        .json({ status: false, message: `User not found !` });
    }
    if (!bcryptjs.compareSync(password, user.password)) {
      return res.status(400).json({ status: false, message: "Error occured" });
    }
    return res.status(200).json({
      status: true,
      message: `User logged in !`,
      token: user.getJWTToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: "Error occured" });
  }

});

userRouter.post("/register", async (req, res, next) => {
  const { name, email, password } = req.body;
  let { role } = req.body;
  try {
    if (await User.findByPk(email)) {
      return res
        .status(403)
        .json({ status: false, message: "User already exists" });
    }
    if (role === "ADMIN") {
      await User.create({
        email,
        password: bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)),
        name,
        role,
      });
    } else {
      await User.create({
        email,
        password: bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)),
        name,
      });
    }
    return res
      .status(200)
      .json({ status: true, message: "User created with id " + email });
  } catch (error) {
    return res.status(403).json({ status: false, message: "Error occured" });
  }
});

userRouter.delete("/remove", auth, async (req, res, next) => {
  const { email } = req.body;

  if (Object.keys(req.body).length !== 1 || !email) {
    return res.status(400).json({ status: false, message: "Enter email id" });
  }
  try {
    if (!(await User.findByPk(email))) {
      return res
        .status(200)
        .json({ status: true, message: "User not found no actions needed !" });
    }
    await User.destroy({
      where: { email },
    });
    return res.status(201).json({ status: true, message: "User removed" });
  } catch (error) {
    return res.status(404).json({ status: false, message: "Error occured" });
  }
});

userRouter.get("/all", auth, async (req, res, next) => {
  try {
    const users = await User.findAll({ attributes: ["email", "name"] });
    return res.status(200).json({ status: true, users });
  } catch (error) {
    return res.status(400).json({ status: false, message: `Error occured` });
  }
});

userRouter.post("/address", auth, async (req, res, next) => {
  const userEmail = req.user.email;
  try {
    const address = await Address.create({ ...req.body, userEmail });
    return res
      .status(200)
      .json({ status: true, message: `Address added !`, address });
  } catch (error) {
    return res.status(400).json({ status: false, message: `Error occured` });
  }
});
userRouter.get("/address/all", auth, async (req, res) => {
  try {
    const addresses = await Address.findAll({
      where: {
        userEmail: req.user.email,
      },
    });
    return res.status(200).json({ status: true, addresses });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: `Error occured` });
  }
});
userRouter.get("/logout", auth, (req, res, next) => {
  return res.status(200).json({ status: true, message: "User logged out !" });
});
module.exports = userRouter;
