const express = require("express");
const router = express.Router();
const {
  createWallet,
  getAllWallets,
  getWalletById,
  deleteWallet,
  updateWallet,
} = require("../controllers/wallet");

router.post("/createWallet", createWallet);
router.get("/getWallets", getAllWallets);
router.get("/getWallet/:id", getWalletById);
router.delete("/deleteWallet/:id", deleteWallet);
router.put("/updateWallet/:id", updateWallet);

module.exports = router;
