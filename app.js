require("dotenv").config();
require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require('morgan');
app.use(morgan('combined'));
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const paymentRouter = require("./routes/payment");
const PORT = process.env.PORT | 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

app.use(paymentRouter);

app.use("*", (req, res, next) => {
  return res.status(400).json({ status: false, message: "No route" });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log("The server is running at port");
});
