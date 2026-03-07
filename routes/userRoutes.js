const express = require("express");
const router = express.Router();

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


// LOGIN utilisateur
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Utilisateur non trouvé" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Connexion réussie",
      token
    });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

module.exports = router;