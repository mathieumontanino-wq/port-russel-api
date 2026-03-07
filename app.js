/**
 * Fichier principal de l'application Express
 */

const express = require("express");
const connectDB = require("./config/database");

const app = express();

// connexion à MongoDB
connectDB();

// Middleware JSON
app.use(express.json());

// Routes
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
app.use("/catways", catwayRoutes);
app.use("/", reservationRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("API Port Russel opérationnelle");
});

module.exports = app;