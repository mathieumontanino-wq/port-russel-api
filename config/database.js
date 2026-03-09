const mongoose = require("mongoose");

const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("Connexion à MongoDB réussie");
        console.log("Base utilisée :", mongoose.connection.name);

    } catch (error) {

        console.error("Erreur de connexion MongoDB :", error);
        process.exit(1);

    }
};

module.exports = connectDB;