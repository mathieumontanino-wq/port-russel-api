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

module.exports = router;