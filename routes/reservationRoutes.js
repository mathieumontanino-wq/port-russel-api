const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation");


// GET toutes les réservations (API)
router.get("/", async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// POST créer une réservation
router.post("/", async (req, res) => {
  try {

    const { catwayNumber, clientName, boatName, startDate, endDate } = req.body;

    if (!catwayNumber || !clientName || !boatName || !startDate || !endDate) {
      return res.status(400).json({ error: "Tous les champs sont obligatoires" });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({ error: "La date de fin doit être après la date de début" });
    }

    const conflict = await Reservation.findOne({
      catwayNumber: catwayNumber,
      startDate: { $lte: new Date(endDate) },
      endDate: { $gte: new Date(startDate) }
    });

    if (conflict) {
      return res.status(400).json({ error: "Catway déjà réservé sur cette période" });
    }

    const reservation = new Reservation({
      catwayNumber,
      clientName,
      boatName,
      startDate,
      endDate
    });

    await reservation.save();

    res.status(201).json(reservation);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE réservation
router.delete("/:id", async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: "Réservation supprimée" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;