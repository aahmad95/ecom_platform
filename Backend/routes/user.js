const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
  loginUser,
  emailConfirmation,
} = require("../controllers/user");

router.post("/createUser", createUser);
router.get("/getUsers", getAllUsers);
router.get("/getUser/:id", getUserById);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);
router.post("/loginUser", loginUser);
router.post("/emailConfirmation", emailConfirmation);

module.exports = router;
