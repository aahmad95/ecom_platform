const express = require("express");
const router = express.Router();
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
} = require("../controllers/product");

router.post("/createProduct", createProduct);
router.get("/getProducts", getAllProducts);
router.get("/getProduct/:id", getProductById);
router.delete("/deleteProduct/:id", deleteProduct);
router.put("/updateProduct/:id", updateProduct);

module.exports = router;
