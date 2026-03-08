/**
 * Point d'entrée du serveur
 */

require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
const Catway = require("./models/catway");
const catwaysData = require("./catways.json");

async function seedCatways() {
  const count = await Catway.countDocuments();

  if (count === 0) {
    await Catway.insertMany(catwaysData);
    console.log("Catways importés");
  }
}

seedCatways();

const Reservation = require("./models/reservation");
const reservationsData = require("./reservations.json");

async function seedReservations() {
  const count = await Reservation.countDocuments();

  if (count === 0) {
    await Reservation.insertMany(reservationsData);
    console.log("Reservations importées");
  }
}

seedReservations();