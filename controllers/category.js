const { Category } = require("../models");

//Get All Categories:
const getAllCategory = async (req, res) => {
  try {
    const category = await Category.findAll();
    if (category.length) {
      return res.json(category);
    }
    return res.json({ message: "There isn't any category yet." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not retrieve category",
    });
  }
};

// Create a New Category
const createCategory = async (req, res) => {
  try {
    const { name, userId } = req.body;
    const Name = await Category.findOne({
      where: { name },
    });
    if (Name) {
      return res.json({ message: "This Category already exist." });
    }
    const category = await Category.create({
      name,
      userId,
    });
    return res.json(category);
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not create a new category",
    });
  }
};

// Get a Category By Id:
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findOne({
      where: { id },
    });
    if (category) {
      return res.json(category);
    }
    return res.json({ message: "There isn't any category of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not find the category",
    });
  }
};

// Update a Category:
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const [category] = await Category.update(req.body, {
      where: { id },
    });

    if (category) {
      return res.json({
        message: "Category updated successfully.",
        Category: await Category.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any category of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not update the category",
    });
  }
};

// Delete a Category:
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findOne({
      where: { id },
    });
    if (category) {
      await category.destroy();
      return res.json({
        message: "Category deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any category of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not delete the category",
    });
  }
};

module.exports = {
  getAllCategory,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
