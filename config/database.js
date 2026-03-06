/**
 * Configuration de la connexion à MongoDB
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/port-russel");

    console.log("Connexion à MongoDB réussie");
  } catch (error) {
    console.error("Erreur de connexion MongoDB :", error);
    process.exit(1);
  }
};

module.exports = connectDB;