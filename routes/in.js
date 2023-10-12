const route = require("express").Router();

route.use("/user", require("./user"));
// route.use("/category", require("./category"));
// route.use("/products", require("./product"));

exports = module.exports = {
  route,
};
