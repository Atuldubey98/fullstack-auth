const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
  appInfo: {
    // For sample support and debugging, not required for production:
    name: "fullstack_auth",
    version: "1.0.0",
    url: "http://localhost:3000",
  },
});

module.exports = stripe;
