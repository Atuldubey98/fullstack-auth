require("dotenv").config({
  path: "../.env",
});
const { default: axios } = require("axios");
require("../database");
const Product = require("../models/Product");
const Rating = require("../models/Rating");
const generateProducts = async () => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    if (Array.isArray(data)) {
      const ratings = data.map(({ rating }) => rating);
      const ids = (await Rating.bulkCreate(ratings)).map(
        (rating) => rating.toJSON()?.id
      );
      const products = data.map(({ id, rating, ...product }, index) => {
        return { ...product, ratingId: ids[index] };
      });
      await Product.bulkCreate(products);
    }
  } catch (error) {
    console.log(error);
  }
};

generateProducts();
