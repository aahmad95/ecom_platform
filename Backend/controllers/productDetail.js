const multer = require("multer");
const path = require("path");
const { ProductDetail } = require("../models");

//Get All ProductDetails:
const getAllProductDetails = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findAll();
    if (productDetail.length) {
      return res.json(productDetail);
    }
    return res.json({ message: "There isn't any Product Details yet." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not retrieve ProductDetails.",
    });
  }
};

// Create a New Product
const createProductDetail = async (req, res) => {
  try {
    const {
      productId,
      stock,
      size,
      color,
      material,
      style,
      operatingSystem,
      processor,
      camera,
      ram,
      storage,
      battery,
      bluetooth,
      gameType,
      ageRange,
      capacity,
      type,
      weight,
      volume,
      shelfLife,
    } = req.body;

    // const product = await ProductDetail.findOne({
    //   where: { productId },
    // });
    // if (product) {
    //   return res.json({
    //     message: "The ProductDetails for this product already exist.",
    //   });
    // }

    const productDetail = await ProductDetail.create({
      productId,
      stock,
      size,
      color,
      material,
      style,
      operatingSystem,
      processor,
      camera,
      ram,
      storage,
      battery,
      bluetooth,
      gameType,
      ageRange,
      capacity,
      type,
      weight,
      volume,
      shelfLife,
    });

    return res.json(productDetail);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not create a new ProductDetail.",
    });
  }
};

// Get a ProductDetail By Id:
const getProductDetailById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await ProductDetail.findOne({
      where: { id },
    });
    if (productDetail) {
      return res.json(productDetail);
    }
    return res.json({
      message: "There isn't any Product Detail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not find the Product Detail.",
    });
  }
};

// Update a Product Detail:
const updateProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const [productDetail] = await ProductDetail.update(req.body, {
      where: { id },
    });

    if (productDetail) {
      return res.json({
        message: "ProductDetail updated successfully.",
        ProductDetail: await ProductDetail.findOne({
          where: { id },
        }),
      });
    }
    return res.json({
      message: "There isn't any Product Detail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not update the Product Detail.",
    });
  }
};

// Delete a ProductDetail:
const deleteProductDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const productDetail = await ProductDetail.findOne({
      where: { id },
    });
    if (productDetail) {
      //   await productDetail.destroy();
      return res.json({
        message: "ProductDetail deleted successfully.",
      });
    }

    return res.json({
      message: "There isn't any ProductDetail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the ProductDetail",
    });
  }
};

module.exports = {
  getAllProductDetails,
  createProductDetail,
  getProductDetailById,
  updateProductDetail,
  deleteProductDetail,
};
