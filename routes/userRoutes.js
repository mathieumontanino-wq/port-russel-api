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

    res.json({ token });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.get("/users", async (req, res) => {

  try {

    const users = await User.find().select("-password");

    res.json(users);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.get("/users/:email", async (req, res) => {

  try {

    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.post("/users", async (req, res) => {

  try {

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if(existingUser){
      return res.status(400).json({ message: "Utilisateur déjà existant" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hash
    });

    await user.save();

    res.status(201).json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.put("/users/:email", async (req, res) => {

  try {

    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    user.username = req.body.username || user.username;

    await user.save();

    res.json(user);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.delete("/users/:email", async (req, res) => {

  try {

    await User.findOneAndDelete({ email: req.params.email });

    res.json({ message: "Utilisateur supprimé" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});
module.exports = router;