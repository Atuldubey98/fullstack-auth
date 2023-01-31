require("dotenv").config();
require("./database");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
const PORT = process.env.PORT | 3000;
app.use(cors());
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "fullstack_auth",
    version: "1.0.0",
    url: "http://localhost:3000",
  },
});
app.get("/config", (req, res) => {
  return res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
app.get("/create-payment-intent", async (req, res, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: 1999,
      automatic_payment_methods: { enabled: true },
    });

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (request, response) => {
    const sig = request.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // Then define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

app.use("*", (req, res, next) => {
  return res.status(400).json({ status: false, message: "No route" });
});
app.listen(PORT, "0.0.0.0", () => {
  console.log("The server is running at port");
});
