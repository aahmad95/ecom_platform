const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");
const { upload } = require("../controllers/image");

router.post("/createCategory", upload, createCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getCategory/:id", getCategoryById);
router.delete("/deleteCategory/:id", deleteCategory);
router.put("/updateCategory/:id", upload, updateCategory);

module.exports = router;
