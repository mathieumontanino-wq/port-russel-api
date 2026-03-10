const express = require("express");
const router = express.Router();

const Catway = require("../models/catway");
const Reservation = require("../models/reservation"); // ajouté


// GET tous les catways (API)
router.get("/", async (req, res) => {

  try {

    const catways = await Catway.find();
    res.json(catways);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// GET un catway (API)
router.get("/:id", async (req, res) => {

  try {

    const catway = await Catway.findById(req.params.id);
    res.json(catway);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// POST créer un catway
router.post("/", async (req, res) => {

try{

const existing = await Catway.findOne({
catwayNumber:req.body.catwayNumber
})

if(existing){

return res.status(400).json({error:"exists"})

}

const newCatway = new Catway(req.body)

await newCatway.save()

res.status(201).json(newCatway)

}

catch(error){

res.status(500).json({error:error.message})

}

})


// PUT modifier un catway
router.put("/:id", async (req, res) => {

  try {

    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCatway);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// DELETE supprimer un catway
router.delete("/:id", async (req, res) => {

  try {

    await Catway.findByIdAndDelete(req.params.id);

    // redirection vers la page EJS
    res.json({ message: "Catway supprimé" });

  } catch (error) {

    res.status(500).send(error.message);

  }

});

// GET toutes les réservations d'un catway
router.get("/:id/reservations", async (req, res) => {

  try {

    const reservations = await Reservation.find({
      catwayNumber: req.params.id
    });

    res.json(reservations);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// GET détail d'une réservation d'un catway
router.get("/:id/reservations/:idReservation", async (req, res) => {

  try {

    const reservation = await Reservation.findById(
      req.params.idReservation
    );

    res.json(reservation);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// POST créer une réservation pour un catway
router.post("/:id/reservations", async (req, res) => {

  try {

    const reservation = new Reservation({

      catwayNumber: req.params.id,
      clientName: req.body.clientName,
      boatName: req.body.boatName,
      startDate: req.body.startDate,
      endDate: req.body.endDate

    });

    await reservation.save();

    res.status(201).json(reservation);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// PUT modifier une réservation
router.put("/:id/reservations/:idReservation", async (req, res) => {

  try {

    const updatedReservation = await Reservation.findByIdAndUpdate(

      req.params.idReservation,
      req.body,
      { new: true }

    );

    res.json(updatedReservation);

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


// DELETE supprimer une réservation
router.delete("/:id/reservations/:idReservation", async (req, res) => {

  try {

    await Reservation.findByIdAndDelete(
      req.params.idReservation
    );

    res.json({ message: "Réservation supprimée" });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

});


module.exports = router;