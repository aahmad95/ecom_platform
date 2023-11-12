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
    const items = await OrderItem.findAll({
      where: { orderId },
    });
    const orderItems = [];
    // {orderItem: orderItems, productDetail: productDetail, product: product}
    if (items.length) {
      const orderItemsPromises = items.map(async (item) => {
        var requestOptions = {
          method: "GET",
          redirect: "follow",
        };

        const response = await fetch(
          `http://localhost:5000/api/v1/productDetail/getProductDetail/${item.productDetailId}`,
          requestOptions
        );
        const json = await response.json();
        const productDetail = json;

        const response1 = await fetch(
          `http://localhost:5000/api/v1/product/getProduct/${productDetail.productId}`,
          requestOptions
        );
        const json1 = await response1.json();

        // Adding Category Name

        const response2 = await fetch(
          `http://localhost:5000/api/v1/category/getCategory/${json1.categoryId}`,
          requestOptions
        );
        const json2 = await response2.json();

        json1["category"] = json2.name;

        const product = json1;
        const orderItem = {
          orderItem: item,
          productDetail,
          product,
        };
        orderItems.push(orderItem);
      });
      await Promise.all(orderItemsPromises);
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

// Get all OrderItems By ProductId:
const getOrderItemsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    const response = await fetch(
      `http://localhost:5000/api/v1/productDetail/getProductDetailsByProduct/${productId}`,
      requestOptions
    );
    if (response.status === 204) {
      return res.status(204).json({
        message: "There isn't any ProductDetail of this productId exist.",
      });
    } else if (response.status === 200) {
      const json = await response.json();
      console.log(json);
      const productDetailIds = [];
      await json.map(async (productDetail) => {
        console.log(productDetail);
        await productDetailIds.push(productDetail.id);
      });

      const orderItems = await OrderItem.findAll({
        where: { productDetailId: productDetailIds },
      });
      if (orderItems) {
        return res.status(200).json(orderItems);
      }
      return res.status(204).json({
        message: "There isn't any OrderItem of these ProductDetails exist.",
      });
    }

    // await Promise.all(orderItemsPromises);
    // return res.status(200).json(orderItems);
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
  getOrderItemsByProductId,
};
