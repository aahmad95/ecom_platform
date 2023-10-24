const express = require("express");
const router = express.Router();
const {
  createAds,
  getAllAds,
  getAdsById,
  deleteAds,
  updateAds,
} = require("../controllers/ads");
const { upload } = require("../controllers/image");

router.post("/createAds", upload, createAds);
router.get("/getAll", getAllAds);
router.get("/getAds/:id", getAdsById);
router.delete("/deleteAds/:id", deleteAds);
router.put("/updateAds/:id", upload, updateAds);

module.exports = router;
