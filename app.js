/**
 * Fichier principal de l'application Express
 */
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/database");

const app = express();

// connexion à MongoDB
connectDB();

// Middleware JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", "./views");

// Routes
const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");
const auth = require("./middleware/auth");
app.use("/", userRoutes);
app.use("/catways", auth, catwayRoutes);
app.use("/", auth, reservationRoutes);
// Route de test
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = app;