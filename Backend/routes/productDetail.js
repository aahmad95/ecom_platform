const express = require("express");
const router = express.Router();
const {
  createProductDetail,
  getAllProductDetails,
  getProductDetailById,
  deleteProductDetail,
  updateProductDetail,
  getProductDetailsByProduct,
  deleteProductDetailsOfProduct,
} = require("../controllers/productDetail");

router.post("/createProductDetail", createProductDetail);
router.get("/getProductDetails", getAllProductDetails);
router.get("/getProductDetail/:id", getProductDetailById);
router.delete("/deleteProductDetail/:id", deleteProductDetail);
router.put("/updateProductDetail/:id", updateProductDetail);
router.get(
  "/getProductDetailsByProduct/:productId",
  getProductDetailsByProduct
);
router.delete(
  "/deleteProductDetailsOfProduct/:productId",
  deleteProductDetailsOfProduct
);

module.exports = router;
