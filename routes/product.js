const express = require("express");
const { auth, isAdmin } = require("../middlewares/auth");
const Product = require("../models/Product");
const { Op } = require("sequelize");
const Rating = require("../models/Rating");
const productRouter = express.Router();

productRouter.post("/", isAdmin, async (req, res, next) => {
  const { rating } = req.body;
  let product = null;
  try {
    if (!rating) {
      product = await Product.create(req.body);
    } else {
      const { id } = await Rating.create(rating);
      product = await Product.create({
        ...req.body,
        ratingId: id,
      });
    }
    return res
      .status(201)
      .json({ status: true, message: `Product created`, product });
  } catch (error) {
    console.log(error);
    console.log("Error occured" + error);
    return res.status(400).json({ status: false, message: "error occured" });
  }
});
productRouter.post("/all", isAdmin, async (req, res, next) => {
  const { products } = req.body;
  if (!products || products.length == 0 || products.length > 10) {
    return res.status(400).json({
      status: false,
      message:
        products === null || products.length == 0
          ? `No products found`
          : "So many products",
    });
  }
  try {
    const bulkCreate = [];
    let notCreated = 0;
    for (const product of products) {
      bulkCreate.push(
        new Promise(async (resolve, reject) => {
          const { rating } = product;
          try {
            if (!rating) {
              await Product.create(product);
            } else {
              const { id } = await Rating.create(rating);
              await Product.create({
                ...product,
                ratingId: id,
              });
            }
            resolve(product);
          } catch (error) {
            notCreated++;
            console.log("Error occured" + error);
            reject(null);
          }
        })
      );
    }
    try {
      await Promise.all(bulkCreate);
      return res.status(201).json({ status: true, message: `Bulk created` });
    } catch (error) {
      console.log(error);
      return res.status(201).json({
        status: true,
        message: `Bulk created ${products.length - notCreated} of ${
          products.length
        }`,
      });
    }
  } catch (error) {
    return res.status(400).json({ status: false, message: `Error occured` });
  }
});
productRouter.get("/:page", auth, async (req, res, next) => {
  try {
    let { limit, search } = req.query;
    let { page } = req.params;
    limit = limit ? parseInt(limit) : 5;
    page = page ? parseInt(page) - 1 : 0;
    search = search ? search : "";
    const offset = page * limit;
    const totalCount = await Product.count({
      where: {
        title: {
          [Op.substring]: search,
        },
      },
    });
    const products = await Product.findAll({
      include: Rating,
      limit,
      offset,
      where: {
        title: {
          [Op.substring]: search,
        },
      },
    });
    const totalPages = Math.ceil(totalCount / limit);
    return res.status(200).json({
      status: true,
      count: products.length,
      totalPages,
      totalCount,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ status: false, message: `Error occured` });
  }
});

module.exports = productRouter;
