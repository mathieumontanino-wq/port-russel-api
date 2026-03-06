const express = require("express");
const router = express.Router();

const Catway = require("../models/catway");

/**
 * GET tous les catways
 */
router.get("/", async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});

/**
 * GET un catway
 */
router.get("/:id", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  res.json(catway);
});

module.exports = router;