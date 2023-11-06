// const multer = require("multer");
// const path = require("path");
const { Ads } = require("../models");

//Get All Ads:
const getAllAds = async (req, res) => {
  try {
    const ads = await Ads.findAll();
    if (ads.length) {
      return res.status(200).json(ads);
    }
    return res.status(200).json({ message: "There isn't any Ads yet." });
  } catch (err) {
    console.log(err);

    res.status(501).send({
      error: "Server Error: Could not retrieve Ads",
    });
  }
};

// Create a New Ads
const createAds = async (req, res) => {
  try {
    const { name, image, userId } = req.body;

    // const Name = await Ads.findOne({
    //   where: { name },
    // });
    // if (Name) {
    //   return res.json({ message: "This Category already exist." });
    // }
    const ads = await Ads.create({
      name,
      image,
      userId,
    });
    return res.status(201).json(ads);
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not create a new Ad.",
    });
  }
};

// Get a Category By Id:
const getAdsById = async (req, res) => {
  try {
    const { id } = req.params;
    const ads = await Ads.findOne({
      where: { id },
    });
    if (ads) {
      return res.json(ads);
    }
    return res.json({ message: "There isn't any Ad of this id exist." });
  } catch (err) {
    console.log(err);

    res.status(501).send({
      error: "Server Error: Could not find the Ad",
    });
  }
};

// Update a Ad:
const updateAds = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("id", id);

    const [ads] = await Ads.update(req.body, {
      where: { id },
    });
    console.log("ads", ads);
    if (ads) {
      return res.status(204).json({
        message: "Ad updated successfully.",
        Ads: await Ads.findOne({
          where: { id },
        }),
      });
    }
    return res.json({ message: "There isn't any Ad of this id exist." });
  } catch (err) {
    console.log(err);
    res.status(501).send({
      error: "Server Error: Could not update the Ad",
    });
  }
};

// Delete a Ads:
const deleteAds = async (req, res) => {
  try {
    const { id } = req.params;

    const ads = await Ads.findOne({
      where: { id },
    });
    if (ads) {
      // await ads.destroy();
      return res.status(204).json({
        message: "Ad deleted successfully.",
      });
    }

    return res.json({ message: "There isn't any Ad of this id exist." });
  } catch (err) {
    console.log(err);

    res.status(501).send({
      error: "Server Error: Could not delete the Ad",
    });
  }
};

module.exports = {
  getAllAds,
  createAds,
  getAdsById,
  updateAds,
  deleteAds,
};
