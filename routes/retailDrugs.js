const express = require('express');
const router = express.Router();
const RetailDrug = require('../models/retailDrug');
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





// GET ALL RETAIL DRUGS
router.get('/', async (req, res) => {
  try {
    const retailDrugs = await RetailDrug.find();
    res.send(retailDrugs);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});

// GET ONE RETAIL DRUG
router.get('/:id', async (req, res) => {
  try {
    const retailDrug = await RetailDrug.findById(req.params.id);
    res.send(retailDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});



// CREATE ONE RETAIL DRUG
router.post('/', upload.array('images', 5), async(req, res) => {
  const { drugCompany, drugName, genericName, OTC, forms, strengths, category, description } = req.body;
  const images = req.files.map(file => ({ url: file.originalname }));
  const retailDrug = new RetailDrug({
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
    const newRetailDrug = await retailDrug.save();
    res.send(newRetailDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


// UPDATE ONE RETAIL DRUG
router.put('/:id', upload.array('images', 5), async (req, res) => {
  const { drugCompany, drugName, genericName, OTC, forms, strengths, category, description } = req.body;
  const images = req.files.map(file => ({ url: file.originalname }));
  try {
    const updatedRetailDrug = await RetailDrug.updateOne(
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
    res.send(updatedRetailDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});



// DELETE ONE RETAIL DRUG
router.delete('/:id', async (req, res) => {
  try {
    const deletedRetailDrug = await RetailDrug.deleteOne({ _id: req.params.id });
    res.send(deletedRetailDrug);
  } catch (e){ for(i in e.errors) res.status(500).send({message: e.errors[i].message}) }
});


module.exports = router;