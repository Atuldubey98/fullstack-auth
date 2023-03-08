const express = require("express");
const { auth } = require("../middlewares/auth");
const stripe = require("../stripeConnect");
const paymentRouter = express.Router();
paymentRouter.get("/config", auth, (req, res) => {
  return res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});
paymentRouter.post("/create-payment-intent", auth, async (req, res, next) => {
  try {
    const { products } = await req.body;
    if (!products || products.length === 0) {
      return res.status(400).json({ status: false });
    }
    const amount = products.reduce(
      (sum, { price, quantity }) => sum + price * quantity,
      0
    );
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "INR",
      amount: parseInt(amount),
      automatic_payment_methods: { enabled: true  },
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
paymentRouter.post(
  "/webhook",
  auth,
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

module.exports = paymentRouter;
