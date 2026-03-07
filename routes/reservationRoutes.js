const express = require("express");
const router = express.Router();

const Reservation = require("../models/reservation");


// GET toutes les réservations d’un catway
router.get("/catways/:id/reservations", async (req, res) => {

  const reservations = await Reservation.find({
    catwayNumber: req.params.id
  });

  res.json(reservations);

});


const mongoose = require("mongoose");

// GET une réservation précise
router.get("/catways/:id/reservations/:idReservation", async (req, res) => {

  try {

    const idReservation = req.params.idReservation;

    // Vérifie si l'id est un ObjectId valide
    if (!mongoose.Types.ObjectId.isValid(idReservation)) {
      return res.status(400).json({ message: "ID de réservation invalide" });
    }

    const reservation = await Reservation.findById(idReservation);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(reservation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// POST créer une réservation pour un catway
router.post("/catways/:id/reservations", async (req, res) => {

  const newReservation = new Reservation({
    catwayNumber: req.params.id,
    clientName: req.body.clientName,
    boatName: req.body.boatName,
    startDate: req.body.startDate,
    endDate: req.body.endDate
  });

  const savedReservation = await newReservation.save();

  res.json(savedReservation);

});

// PUT modifier une réservation
router.put("/catways/:id/reservations/:idReservation", async (req, res) => {

  try {

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.idReservation,
      {
        clientName: req.body.clientName,
        boatName: req.body.boatName,
        startDate: req.body.startDate,
        endDate: req.body.endDate
      },
      { new: true } // renvoie la réservation modifiée
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json(reservation);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

// DELETE supprimer une réservation
router.delete("/catways/:id/reservations/:idReservation", async (req, res) => {

  try {

    const reservation = await Reservation.findByIdAndDelete(req.params.idReservation);

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.json({ message: "Réservation supprimée avec succès" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

module.exports = router;