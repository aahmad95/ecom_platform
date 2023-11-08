const { OrderItem } = require("../models");

//Get All Orders:
const getAllOrderItems = async (req, res) => {
  try {
    const orderItem = await OrderItem.findAll();
    if (orderItem.length) {
      return res.json(orderItem);
    }
    return res.json({ message: "There isn't any OrderItem yet." });
  } catch (err) {
    console.log(err);

    res.status(501).send({
      error: "Server Error: Could not retrieve OrderItems.",
    });
  }
};

// Create a New OrderItem
const createOrderItem = async (req, res) => {
  try {
    const { price, quantity, productDetailId, orderId } = req.body;
    // const order = await Order.findOne({
    //   where: { userId },
    // });
    // if (user) {
    //   return res.json({ message: "The Wallet for this user already exist." });
    // }
    const orderItem = await OrderItem.create({
      price,
      quantity,
      productDetailId,
      orderId,
    });
    return res.json(orderItem);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not create a new OrderItem.",
    });
  }
};

// Get a OrderItem By Id:
const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findOne({
      where: { id },
    });
    if (orderItem) {
      return res.json(orderItem);
    }
    return res.json({ message: "There isn't any OrderItem of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not find the OrderItem.",
    });
  }
};

// Update a OrderItem:
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const [orderItem] = await OrderItem.update(req.body, {
      where: { id },
    });

    if (orderItem) {
      return res.json({
        message: "OrderItem updated successfully.",
        OrderItem: await OrderItem.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any OrderItem of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not update the OrderItem.",
    });
  }
};

// Delete a OrderItem:
const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const orderItem = await OrderItem.findOne({
      where: { id },
    });
    if (orderItem) {
      //   await orderItem.destroy();
      return res.json({
        message: "OrderItem deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any OrderItem of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the OrderItem.",
    });
  }
};
// Get all OrderItems By OrderId:
const getOrderItemsByOrderId = async (req, res) => {
  try {
    const { orderId } = req.params;
    const orderItems = await OrderItem.findAll({
      where: { orderId },
    });
    if (orderItems.length) {
      return res.status(200).json(orderItems);
    }
    return res
      .status(404)
      .json({ message: "There isn't any OrderItem of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal Server Error: Could not find the OrderItem.",
    });
  }
};
module.exports = {
  getAllOrderItems,
  createOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
  getOrderItemsByOrderId,
};
