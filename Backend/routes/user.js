// // sequelize = new Sequelize(...);
// const User = require("../../models/user");
// const route = require("express").Router();

// route.get("/", (req, res) => {
//   // We want to send an array of all users from our database
//   User.findAll()
//     .then((users) => {
//       res.status(200).send(users);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         error: "Could not retrieve users",
//       });
//     });
// });

// route.post("/", (req, res) => {
//   // We expect the req to have user's data in it
//   // We will create the new user of the given data

//   User.create({
//     username: req.body.name,
//     role: req.body.role,
//     email: req.body.email,
//     password: req.body.password,
//   })
//     .then((user) => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(501).send({
//         error: "Could not create new user.",
//       });
//     });
// });
// exports = module.exports = route;

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
