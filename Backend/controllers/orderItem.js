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
    const { price, quantity, productId, orderId } = req.body;
    // const order = await Order.findOne({
    //   where: { userId },
    // });
    // if (user) {
    //   return res.json({ message: "The Wallet for this user already exist." });
    // }
    const orderItem = await OrderItem.create({
      price,
      quantity,
      productId,
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

module.exports = {
  getAllOrderItems,
  createOrderItem,
  getOrderItemById,
  updateOrderItem,
  deleteOrderItem,
};
