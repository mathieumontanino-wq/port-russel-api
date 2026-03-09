require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");

const Catway = require("./models/catway");
const Reservation = require("./models/reservation");

const catwaysData = require("./catways.json");
const reservationsData = require("./reservations.json");

const PORT = process.env.PORT || 3000;

async function startServer() {

  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté");

    // IMPORT CATWAYS (si vide)
    const catwayCount = await Catway.countDocuments();

    if (catwayCount === 0) {
      await Catway.insertMany(catwaysData);
      console.log("Catways importés");
    } else {
      console.log("Catways déjà présents");
    }

    // IMPORT RESERVATIONS (si vide)
    const reservationCount = await Reservation.countDocuments();

    if (reservationCount === 0) {
      await Reservation.insertMany(reservationsData);
      console.log("Réservations importées");
    } else {
      console.log("Réservations déjà présentes");
    }

    // START SERVER
    app.listen(PORT, () => {
      console.log(`Serveur démarré sur le port ${PORT}`);
    });

  } catch (error) {

    console.error("Erreur serveur :", error);

  }

}

startServer();