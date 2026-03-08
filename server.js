/**
 * Point d'entrée du serveur
 */

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

    // connexion MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connecté");



    // SEED CATWAYS
    const catwayCount = await Catway.countDocuments();

    if (catwayCount === 0) {

      await Catway.insertMany(catwaysData);

      console.log("Catways importés");

    }



    // SEED RESERVATIONS
    const reservationCount = await Reservation.countDocuments();

    if (reservationCount === 0) {

      await Reservation.insertMany(reservationsData);

      console.log("Réservations importées");

    }



    // démarrage serveur
    app.listen(PORT, () => {

      console.log(`Serveur démarré sur le port ${PORT}`);

    });

  }

  catch(error){

    console.error("Erreur serveur :", error);

  }

}

startServer();