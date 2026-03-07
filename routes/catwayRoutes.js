const express = require("express");
const router = express.Router();

const Catway = require("../models/catway");


// GET tous les catways
router.get("/", async (req, res) => {
  const catways = await Catway.find();
  res.json(catways);
});


// GET un catway
router.get("/:id", async (req, res) => {
  const catway = await Catway.findById(req.params.id);
  res.json(catway);
});


// POST créer un catway
router.post("/", async (req, res) => {
  const newCatway = new Catway(req.body);
  const savedCatway = await newCatway.save();
  res.json(savedCatway);
});


// PUT modifier un catway
router.put("/:id", async (req, res) => {
  const updatedCatway = await Catway.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedCatway);
});


// DELETE supprimer un catway
router.delete("/:id", async (req, res) => {
  await Catway.findByIdAndDelete(req.params.id);

  res.json({ message: "Catway supprimé" });
});

module.exports = router;