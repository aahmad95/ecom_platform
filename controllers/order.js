const { Order } = require("../models");

//Get All Orders:
const getAllOrders = async (req, res) => {
  try {
    const order = await Order.findAll();
    if (order.length) {
      return res.json(order);
    }
    return res.json({ message: "There isn't any Order yet." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not retrieve Orders.",
    });
  }
};

// Create a New Order
const createOrder = async (req, res) => {
  try {
    const { Amount, userId } = req.body;
    // const order = await Order.findOne({
    //   where: { userId },
    // });
    // if (user) {
    //   return res.json({ message: "The Wallet for this user already exist." });
    // }
    const order = await Order.create({
      Amount,
      userId,
    });
    return res.json(order);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not create a new Order.",
    });
  }
};

// Get a Order By Id:
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id },
    });
    if (order) {
      return res.json(order);
    }
    return res.json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not find the Order.",
    });
  }
};

// Update a Order:
const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const [order] = await Order.update(req.body, {
      where: { id },
    });

    if (order) {
      return res.json({
        message: "Order updated successfully.",
        Order: await Order.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not update the Order.",
    });
  }
};

// Delete a Order:
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
    });
    if (order) {
      await order.destroy();
      return res.json({
        message: "Order deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any Order of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the Order",
    });
  }
};

module.exports = {
  getAllOrders,
  createOrder,
  getOrderById,
  updateOrder,
  deleteOrder,
};
