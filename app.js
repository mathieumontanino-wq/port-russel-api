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
const Catway = require("./models/catway");
const Reservation = require("./models/reservation");
const User = require("./models/user");

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
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});
app.get("/catways-page", async (req, res) => {

  const catways = await Catway.find();

  res.render("catways", { catways });

});
app.get("/reservations-page", async (req, res) => {

  const reservations = await Reservation.find();

  res.render("reservations", { reservations });

});
app.get("/users-page", async (req, res) => {

  const users = await User.find();

  res.render("users", { users });

});

module.exports = app;