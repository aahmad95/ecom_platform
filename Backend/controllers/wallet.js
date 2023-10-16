const { Wallet } = require("../models");

//Get All Wallets:
const getAllWallets = async (req, res) => {
  try {
    const wallet = await Wallet.findAll();
    if (wallet.length) {
      return res.json(wallet);
    }
    return res.json({ message: "There isn't any Wallet yet." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not retrieve Wallets.",
    });
  }
};

// Create a New Wallet
const createWallet = async (req, res) => {
  try {
    const { Amount, userId } = req.body;
    const user = await Wallet.findOne({
      where: { userId },
    });
    if (user) {
      return res.json({ message: "The Wallet for this user already exist." });
    }
    const wallet = await Wallet.create({
      Amount,
      userId,
    });
    return res.json(wallet);
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not create a new wallet.",
    });
  }
};

// Get a Wallet By Id:
const getWalletById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallet = await Wallet.findOne({
      where: { id },
    });
    if (wallet) {
      return res.json(wallet);
    }
    return res.json({ message: "There isn't any wallet of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not find the wallet.",
    });
  }
};

// Update a Category:
const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;

    const [wallet] = await Wallet.update(req.body, {
      where: { id },
    });

    if (wallet) {
      return res.json({
        message: "Wallet updated successfully.",
        Wallet: await Wallet.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any Wallet of this id exist." });
  } catch (err) {
    console.log(err);
    // return res.status(500).json({ error: "something went wrong" });
    res.status(501).send({
      error: "Server Error: Could not update the Wallet.",
    });
  }
};

// Delete a Category:
const deleteWallet = async (req, res) => {
  try {
    const { id } = req.params;

    const wallet = await Wallet.findOne({
      where: { id },
    });
    if (wallet) {
      await wallet.destroy();
      return res.json({
        message: "Wallet deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any Wallet of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not delete the Wallet",
    });
  }
};

module.exports = {
  getAllWallets,
  createWallet,
  getWalletById,
  updateWallet,
  deleteWallet,
};
