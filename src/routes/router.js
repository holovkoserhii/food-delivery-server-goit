const mainRoute = require("./main/main");
const signUpRoute = require("./users/sign-up-route");
const products = require("./products/products");

const router = {
  "/signup": signUpRoute,
  "/products": products,
  default: mainRoute
};

module.exports = router;
