const express = require('express');
const router = express.Router();
const WholesaleDrug = require('../models/wholesaleDrug');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


// GET ALL WHOLESALE DRUGS
router.get('/', async (req, res) => {
  try {
    const wholesaleDrugs = await WholesaleDrug.find();
    res.send(wholesaleDrugs);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// GET ONE WHOLESALE DRUG
router.get('/:id', async (req, res) => {
  try {
    const wholesaleDrug = await WholesaleDrug.findById(req.params.id);
    res.send(wholesaleDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
} );


// CREATE ONE WHOLESALE DRUG
router.post('/', upload.array('images', 5), async (req, res) => {
  const { drugCompany, drugName, genericName, OTC, forms, strengths, category, description } = req.body;
  const images = req.files.map(file => ({ url: file.originalname }));
  const wholesaleDrug = new WholesaleDrug({
    drugCompany,
    drugName,
    genericName,
    OTC,
    forms: JSON.parse(forms),
    strengths: JSON.parse(strengths),
    category,
    images,
    description,
  });

  try {
    const newWholesaleDrug = await wholesaleDrug.save();
    res.send(newWholesaleDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
} );


// UPDATE ONE WHOLESALE DRUG
router.put('/:id', upload.array('images', 5), async (req, res) => {
  const { drugCompany, drugName, genericName, OTC, forms, strengths, category, description } = req.body;
  const images = req.files.map(file => ({ url: file.originalname }));
  try {
    const updatedWholesaleDrug = await WholesaleDrug.updateOne(
      { _id: req.params.id },
      {
        drugCompany,
        drugName,
        genericName,
        OTC,
        forms: JSON.parse(forms),
        strengths: JSON.parse(strengths),
        category,
        images,
        description,
      }
    );
    res.send(updatedWholesaleDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
} );


// DELETE ONE WHOLESALE DRUG
router.delete('/:id', async (req, res) => {
  try {
    const deletedWholesaleDrug = await WholesaleDrug.deleteOne({ _id: req.params.id });
    res.send(deletedWholesaleDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


module.exports = router;