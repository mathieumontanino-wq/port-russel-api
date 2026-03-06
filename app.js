/**
 * Fichier principal de l'application Express
 * Initialise l'application et les middlewares
 */

const express = require("express");

const app = express();

// Middleware permettant de lire le JSON dans les requêtes
app.use(express.json());

// Route de test
app.get("/", (req, res) => {
  res.send("API Port Russel opérationnelle");
});

module.exports = app;