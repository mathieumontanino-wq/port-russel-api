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


module.exports = router;