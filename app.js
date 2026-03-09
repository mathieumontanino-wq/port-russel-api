require("dotenv").config();

const express = require("express");
const methodOverride = require("method-override");

const connectDB = require("./config/database");

const Catway = require("./models/catway");
const Reservation = require("./models/reservation");
const User = require("./models/user");

const catwayRoutes = require("./routes/catwayRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", "./views");


// ROUTES API

app.use("/", userRoutes);
app.use("/catways", catwayRoutes);
app.use("/reservations", reservationRoutes);


// PAGES FRONT

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});


/*
PAGE CATWAYS
Etat calculé automatiquement selon les réservations
*/

app.get("/catways-page", async (req, res) => {

  const catways = await Catway.find();
  const reservations = await Reservation.find();

  const today = new Date();

  const catwaysWithStatus = catways.map(catway => {

    const isReserved = reservations.some(res =>

      res.catwayNumber == catway.catwayNumber &&
      new Date(res.startDate) <= today &&
      new Date(res.endDate) >= today

    );

    return {

      ...catway.toObject(),
      reserved: isReserved

    };

  });

  res.render("catways", { catways: catwaysWithStatus });

});


app.get("/reservations-page", async (req, res) => {

  const reservations = await Reservation.find();
  res.render("reservations", { reservations });

});


app.get("/users-page", async (req, res) => {

  const users = await User.find();
  res.render("users", { users });

});


app.get("/docs", (req, res) => {
  res.render("docs");
});


module.exports = app;