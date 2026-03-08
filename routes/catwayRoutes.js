const express = require("express");
const router = express.Router();

const Catway = require("../models/catway");


// GET tous les catways (API)
router.get("/", async (req, res) => {

  try {

    const catways = await Catway.find();
    res.json(catways);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// GET un catway (API)
router.get("/:id", async (req, res) => {

  try {

    const catway = await Catway.findById(req.params.id);
    res.json(catway);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// POST créer un catway
router.post("/", async (req, res) => {

try{

const existing = await Catway.findOne({
catwayNumber:req.body.catwayNumber
})

if(existing){

return res.status(400).json({error:"exists"})

}

const newCatway = new Catway(req.body)

await newCatway.save()

res.status(201).json(newCatway)

}

catch(error){

res.status(500).json({error:error.message})

}

})

// PUT modifier un catway
router.put("/:id", async (req, res) => {

  try {

    const updatedCatway = await Catway.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedCatway);

  } catch (error) {

    res.status(500).send(error.message);

  }

});


// DELETE supprimer un catway
router.delete("/:id", async (req, res) => {

  try {

    await Catway.findByIdAndDelete(req.params.id);

    // redirection vers la page EJS
    res.redirect("/catways-page");

  } catch (error) {

    res.status(500).send(error.message);

  }

});

module.exports = router;