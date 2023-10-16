const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategory,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

router.post("/createCategory", createCategory);
router.get("/getAllCategory", getAllCategory);
router.get("/getCategory/:id", getCategoryById);
router.delete("/deleteCategory/:id", deleteCategory);
router.put("/updateCategory/:id", updateCategory);

module.exports = router;
