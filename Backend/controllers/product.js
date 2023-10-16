const { Product } = require("../models");

//Get All Products:
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.findAll();
    if (product.length) {
      return res.json(product);
    }
    return res.json({ message: "There isn't any Product yet." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
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
      price,
      warranty,
      status,
    });

    return res.json(product);
  } catch (err) {
    console.log(err);
    res.status(501).send({
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
      return res.json(product);
    }
    return res.json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
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
      return res.json({
        message: "Product updated successfully.",
        Product: await Product.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
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
      //   await product.destroy();
      return res.json({
        message: "Product deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any Product of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the Product",
    });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
