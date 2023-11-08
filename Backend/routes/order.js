const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  deleteOrder,
  updateOrder,
  getOrdersByUserId,
} = require("../controllers/order");

router.post("/createOrder", createOrder);
router.get("/getOrders", getAllOrders);
router.get("/getOrder/:id", getOrderById);
router.delete("/deleteOrder/:id", deleteOrder);
router.put("/updateOrder/:id", updateOrder);
router.get("/getOrdersByUserId/:userId", getOrdersByUserId);

module.exports = router;
