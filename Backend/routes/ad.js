const express = require("express");
const router = express.Router();
const {
  createAds,
  getAllAds,
  getAdsById,
  deleteAds,
  updateAds,
} = require("../controllers/ads");

router.post("/createAds", createAds);
router.get("/getAll", getAllAds);
router.get("/getAds/:id", getAdsById);
router.delete("/deleteAds/:id", deleteAds);
router.put("/updateAds/:id", updateAds);

module.exports = router;
