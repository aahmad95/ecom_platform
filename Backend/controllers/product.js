const { Product } = require("../models");

//Get All Products:
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    if (product.length) {
      return res.status(200).json(product);
    }
    return res.status(204).json({ message: "There isn't any Product yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not retrieve Products.",
    });
  }
};

// Create a New Product
const createProduct = async (req, res) => {
  try {
    const {
      name,
      userId,
      categoryId,
      brand,
      description,
      image,
      price,
      warranty,
      status,
    } = req.body;

    const product = await Product.create({
      name,
      userId,
      categoryId,
      brand,
      description,
      image,
      price,
      warranty,
      status,
    });
    return res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not create a new Product.",
    });
  }
};

// Get a Product By Id:
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    if (product) {
      return res.status(200).json(product);
    }
    return res
      .status(204)
      .json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find the Product.",
    });
  }
};

// Update a Product:
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const [product] = await Product.update(req.body, {
      where: { id },
    });

    if (product) {
      return res.status(200).json({
        message: "Product updated successfully.",
        Product: await Product.findOne({
          where: { id },
        }),
      });
    }
    return res
      .status(204)
      .json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not update the Product.",
    });
  }
};

// Delete a Product:
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({
      where: { id },
    });
    if (product) {
      await product.destroy();
      return res.status(200).json({
        message: "Product deleted successfully.",
      });
    }

    return res
      .status(204)
      .json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not delete the Product",
    });
  }
};
// Get all Products of a Category:
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = await req.params;
    console.log("categoryId----->", categoryId);
    const products = await Product.findAll({
      where: { categoryId },
    });
    if (products.length) {
      return res.status(200).json(products);
    }
    return res.status(204).json({
      message: "There isn't any Product of this category exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find the Product of Category.",
    });
  }
};

// Get all Products By userId:
const getProductsOfUser = async (req, res) => {
  try {
    const { sellerId } = await req.params;
    console.log(sellerId);
    const product = await Product.findAll({
      where: { userId: sellerId },
    });
    if (product) {
      return res.status(200).json(product);
    }
    return res
      .status(404)
      .json({ message: "There isn't any Product of this user exist." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find the Products.",
    });
  }
};

// Get all Products By userId of Category:
const getProductsOfUserByCategory = async (req, res) => {
  try {
    const { categoryId, userId } = req.body;
    const product = await Product.findAll({
      where: {
        userId,
        categoryId,
      },
    });
    if (product) {
      return res.status(200).json(product);
    }
    return res.status(204).json({
      message: "There isn't any Product of this user in this category exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal Server Error: Could not find the Products.",
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductsOfUser,
  getProductsOfUserByCategory,
};
