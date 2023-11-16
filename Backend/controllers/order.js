const { Order } = require("../models");

//Get All Orders:
const getAllOrders = async (req, res) => {
  try {
    const order = await Order.findAll();
    if (order.length) {
      return res.status(200).json(order);
    }
    return res.status(204).json({ message: "There isn't any Order yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not retrieve Orders.",
    });
  }
};

// Create a New Order
const createOrder = async (req, res) => {
  try {
    const { payment, userId, paymentMethod, DeliveryFee, address, status } =
      req.body;

    const order = await Order.create({
      payment,
      userId,
      paymentMethod,
      DeliveryFee,
      address,
      status,
    });

    return res.status(200).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not create a new Order.",
    });
  }
};

// Get an Order By Id:
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
    });
    if (order) {
      return res.status(200).json(order);
    }
    return res
      .status(204)
      .json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find the Order.",
    });
  }
};

// Update an Order:
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [order] = await Order.update(req.body, {
      where: { id },
    });

    if (order) {
      return res.status(200).json({
        message: "Order updated successfully.",
        Order: await Order.findOne({
          where: { id },
        }),
      });
    }
    return res
      .status(204)
      .json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not update the Order.",
    });
  }
};

// Delete an Order:
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
    });
    if (order) {
      await order.destroy();
      return res.status(200).json({
        message: "Order deleted successfully.",
      });
    }

    return res
      .status(204)
      .json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not delete the Order",
    });
  }
};

// Get Orders By UserId:
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.findAll({
      where: { userId },
    });
    if (orders.length) {
      return res.status(200).json(orders);
    }
    return res
      .status(404)
      .json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal Server Error: Could not find the Order.",
    });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};
