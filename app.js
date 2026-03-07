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
app.use("/catways", catwayRoutes);

// Route de test
app.get("/", (req, res) => {
  res.send("API Port Russel opérationnelle");
});

module.exports = app;