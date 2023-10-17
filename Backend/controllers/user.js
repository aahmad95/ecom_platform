const { User } = require("../models");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "HelloWorld";
// Get All Users:
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      //   include: "student",
    });
    if (users.length) {
      return res.json(users);
    }
    return res.json({ message: "There isn't any users yet." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not retrieve users",
    });
  }
};

// Create a new User:
const createUser = async (req, res) => {
  const { username, role, email, password } = req.body;
  try {
    const Email = await User.findOne({
      where: { email },
    });
    if (Email) {
      return res.json({ message: "This email is already have an account." });
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);
    const user = await User.create({
      username,
      role,
      email,
      password: secPass,
    });
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);

    return res.json({ authToken });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
    res.status(501).send({
      error: "Server Error: Could not create new user.",
    });
  }
};

// Get a User By Id:
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      return res.json(user);
    }
    return res.json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
    res.status(501).send({
      error: "Server Error: Could not find user.",
    });
  }
};

// Delete a User:
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      where: { id },
    });
    if (user) {
      await user.destroy();
      return res.json({ message: "User deleted successfully" });
    }
    return res.json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
    res.status(501).send({
      error: "Server Error: Could not able to delete the user.",
    });
  }
};

// Update a User:
const updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [user] = await User.update(req.body, {
      where: { id },
    });

    if (user) {
      return res.json({
        message: "User updated successfully.",
        User: await User.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any User of this id exist." });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
    res.status(501).send({
      error: "Server Error: Could not update the user.",
    });
  }
};

// Login a User:
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.json({
        message: "Please try to login with correct credentials.",
      });
    }
    // returns true/false
    const passwordCompare = bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.json({
        message: "Please try to login with correct credentials.",
      });
    }
    const data = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ authToken });
  } catch (err) {
    console.log(err);
    // res.status(500).json(err);
    res.status(501).send({
      error: "Server Error: Could not login user.",
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
};
