const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  getProductsByCategory,
  getProductsOfUser,
  getProductsOfUserByCategory,
} = require("../controllers/product");

router.post("/createProduct", createProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);
router.get("/getProductsByCategory/:categoryId", getProductsByCategory);
router.get("/getProductsOfUser/:sellerId", getProductsOfUser);
router.post("/getProductsOfUserByCategory", getProductsOfUserByCategory);

module.exports = router;
