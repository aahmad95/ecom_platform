const express = require("express");
const router = express.Router();
const {
  createOrderItem,
  getAllOrderItems,
  getOrderItemById,
  deleteOrderItem,
  updateOrderItem,
  getOrderItemsByOrderId,
  getOrderItemsByProductId,
} = require("../controllers/orderItem");

router.post("/createOrderItem", createOrderItem);
router.get("/getOrderItems", getAllOrderItems);
router.get("/getOrderItem/:id", getOrderItemById);
router.delete("/deleteOrderItem/:id", deleteOrderItem);
router.put("/updateOrderItem/:id", updateOrderItem);
router.get("/getOrderItemsByOrderId/:orderId", getOrderItemsByOrderId);
router.get("/getOrderItemsByProductId/:productId", getOrderItemsByProductId);

module.exports = router;
