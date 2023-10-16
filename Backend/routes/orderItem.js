const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  deleteOrderItem,
  updateOrderItem,
} = require("../controllers/orderItem");

router.post("/createOrderItem", createOrderItem);
router.get("/getOrderItems", getAllOrderItems);
router.get("/getOrderItem/:id", getOrderItemById);
router.delete("/deleteOrderItem/:id", deleteOrderItem);
router.put("/updateOrderItem/:id", updateOrderItem);

module.exports = router;
