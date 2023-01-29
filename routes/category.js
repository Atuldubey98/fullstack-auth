const { Router } = require("express");
const { auth } = require("../middlewares/auth");
const Product = require("../models/Product");

const categoryRouter = Router();
categoryRouter.get("/", auth, async (req, res, next) => {
  try {
    const categories = await Product.aggregate("category", "DISTINCT", {
      plain: false,
    });
    return res.status(200).json({
      status: true,
      categories: categories
        .map((category) => category.DISTINCT)
        .filter((category) => category !== null),
    });
  } catch (error) {
    return res.status(200).json({ status: false, message: `Error occured` });
  }
});
module.exports = categoryRouter;
