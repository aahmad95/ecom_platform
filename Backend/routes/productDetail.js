const express = require("express");
const router = express.Router();
const {
  createProductDetail,
  getAllProductDetails,
  getProductDetailById,
  deleteProductDetail,
  updateProductDetail,
  getProductDetailsByProduct,
} = require("../controllers/productDetail");
const { upload } = require("../controllers/image");

router.post("/createProductDetail", createProductDetail);
router.get("/getProductDetails", getAllProductDetails);
router.get("/getProductDetail/:id", getProductDetailById);
router.delete("/deleteProductDetail/:id", deleteProductDetail);
router.put("/updateProductDetail/:id", updateProductDetail);
router.get(
  "/getProductDetailsByProduct/:productId",
  getProductDetailsByProduct
);

module.exports = router;
