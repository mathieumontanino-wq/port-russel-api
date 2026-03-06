/**
 * Fichier principal de l'application Express
 */

const express = require("express");
const connectDB = require("./config/database");

const app = express();

// connexion à MongoDB
connectDB();

// Middleware permettant de lire le JSON
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("API Port Russel opérationnelle");
});

module.exports = app;

const catwayRoutes = require("./routes/catwayRoutes");

app.use("/catways", catwayRoutes);