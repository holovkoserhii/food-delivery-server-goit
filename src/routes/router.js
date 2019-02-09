const mainRoute = require("./main/main");
// const motocycleRoute = require('./motocycle/motocycle');
const signUpRoute = require("./users/sign-up-route");
const products = require("./products/products");

const router = {
  "/signup": signUpRoute,
  "/products": products,
  // '/motocycle': motocycleRoute,
  default: mainRoute
};

module.exports = router;
