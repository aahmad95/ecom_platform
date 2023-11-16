const { ProductDetail } = require("../models");

//Get All ProductDetails:
const getAllProductDetails = async (req, res) => {
  try {
    const productDetail = await ProductDetail.findAll();
    if (productDetail.length) {
      return res.status(200).json(productDetail);
    }
    return res
      .status(204)
      .json({ message: "There isn't any Product Details yet." });
  } catch (err) {
    console.log(err);
    res.status(500).send({
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
      image,
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

    const productDetail = await ProductDetail.create({
      productId,
      stock,
      image,
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

    return res.status(200).json(productDetail);
  } catch (err) {
    console.log(err);
    res.status(500).send({
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
      return res.status(200).json(productDetail);
    }
    return res.status(204).json({
      message: "There isn't any Product Detail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
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
      return res.status(200).json({
        message: "ProductDetail updated successfully.",
        ProductDetail: await ProductDetail.findOne({
          where: { id },
        }),
      });
    }
    return res.status(204).json({
      message: "There isn't any Product Detail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
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
      await productDetail.destroy();
      return res.status(200).json({
        message: "ProductDetail deleted successfully.",
      });
    }

    return res.status(204).json({
      message: "There isn't any ProductDetail of this id exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the ProductDetail",
    });
  }
};

// Get all ProductDetails of a Product:
const getProductDetailsByProduct = async (req, res) => {
  try {
    const { productId } = await req.params;

    const productDetails = await ProductDetail.findAll({
      where: { productId },
    });
    if (productDetails.length) {
      return res.status(200).json(productDetails);
    }
    return res.status(204).json({
      message: "There isn't any Product Details of this Product exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Server Error: Could not find the Product Details of Product.",
    });
  }
};

// Delete all ProductDetails of a Product:
const deleteProductDetailsOfProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const productDetail = await ProductDetail.findAll({
      where: { productId },
    });
    if (productDetail.length) {
      // No of deleted rows
      const detail = await ProductDetail.destroy({
        where: { productId },
      });
      console.log("detail", detail);
      return res.status(200).json({
        message: "All ProductDetails of this product deleted successfully.",
      });
    }

    return res.status(204).json({
      message: "There isn't any ProductDetail of this ProductId exist.",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
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
  getProductDetailsByProduct,
  deleteProductDetailsOfProduct,
};
